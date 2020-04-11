const fs = require('fs')
const combinatorics = require('js-combinatorics')
const natural = require('natural')
const accents = require('remove-accents')
const sw = require('stopword')

// Load JSON

const authors = []
fs.readFile(__dirname + '/data/authors.json', (err, json) => {
    if (err) throw err
    analysis(JSON.parse(json))
})

// Text analysis

const analysis = authors => {

    // Reduce authors

    const min = 30
    authors = authors.reduce((array, author, i) => {
        console.log('Filtering author #', i)
        if (author.docs >= min)
            array.push(author)
        return array
    }, [])

    // Tokenizer

    const tokenizer = new natural.WordTokenizer()
    authors.forEach((author, i) => {
        console.log('Tokenizing author #', i)
        author.tokens = tokenizer.tokenize(author.text)
    })

    // Cleaning

    const stopWords = ['']
    authors.forEach(author => author.tokens = author.tokens.filter(token => token.length > 2))
    authors.forEach(author => author.tokens = author.tokens.filter(token => !stopWords.includes(token)))
    authors.forEach(author => author.tokens = author.tokens.filter(token => !parseInt(token)))
    authors.forEach(author => author.tokens = sw.removeStopwords(author.tokens))

    // Singularize
    const inflector = new natural.NounInflector()
    const safeList = ['sars', 'savs', 'trans', 'recsars', 'facs']
    authors.forEach((author, i) => {
        // console.log('Singularizing author #', i)
        author.tokens = author.tokens.map(t => {
            if ((safeList.includes(t) && t.length > 3) || /us$/.test(t) || /is$/.test(t)) {
                return t
            } else {
                const newt = inflector.singularize(t)
                if (/.*(s)$/.test(t))
                    console.log(`Singularizing \t ${t} \t ${newt}`)
                return newt
            }
        })
    })

    // TF-IDF

    const tokenFrequency = new natural.TfIdf()
    authors.forEach((author, i) => {
        console.log('Frequencing for author #', i)
        tokenFrequency.addDocument(author.tokens)
    })

    // Reduction and shaping

    const slice = 10
    // const peaks = 1000
    authors.forEach((item, i) => {
        console.log('Reducing for author #', i)
        item.tokens = tokenFrequency.listTerms(i)
            // .filter(el => el.tfidf > tfidfLimit) // Remove bottom
            // .filter(el => el.tfidf < peaks) // Remove peaks
            .slice(0, slice) // Slice first x elements
            .reduce((obj, el) => {
                obj[el.term] = Math.floor(el.tfidf)
                return obj
            }, {})
    })

    // Set nodes

    const nodes = authors.reduce((array, author, i) => {
        delete author.text
        author.id = i
        author.relevancy = Math.floor(Object.values(author.tokens).reduce((a, b) => a + b))
        array.push(author)
        return array
    }, [])

    // Set links

    const pairs = combinatorics.bigCombination(authors, 2)
    const links = []
    let maxCommonTokens = 0
    let i = pairs.length

    pairs.forEach(pair => {

        const min = 3
        const p1 = pair[0], p2 = pair[1]
        const t1 = p1.tokens, t2 = p2.tokens
        const tokens = Object.keys(p1.tokens).filter(n => Object.keys(p2.tokens).includes(n))
        i = i - 1

        if (tokens.length <= min)
            return

        if (tokens.length > maxCommonTokens)
            maxCommonTokens = tokens.length
            
        console.log('#', i, '|', tokens.length, 'terms between', p2.name, 'and', p1.name)

        tokens.forEach(token => {

            const link = links.find(link => link.source === p1.id && link.target === p2.id)
            const value = t1[token] + t2[token]

            if (link) {
                link.value += value
                link.tokens[token] = value
            } else {
                const link = {
                    source: p1.id,
                    target: p2.id,
                    value: value,
                    tokens: {
                        [token]: value,
                    }
                }
                links.push(link)
            }
        })
    })

    // Normalization

    links.forEach(link => link.value = Math.floor(link.value))
    const maxLinkValue = links.reduce((max, link) => max > link.value ? max : link.value, 0)
    const minLinkValue = links.reduce((min, link) => min < link.value ? min : link.value, 100000)
    links.forEach(link => link.value = (link.value / maxLinkValue).toFixed(2))

    // Writing files

    fs.writeFile('./src/data/nodes.json', JSON.stringify(nodes), err => { if (err) throw err })
    fs.writeFile('./data/nodes.json', JSON.stringify(nodes, null, '\t'), err => { if (err) throw err })

    fs.writeFile('./src/data/links.json', JSON.stringify(links), err => { if (err) throw err })
    fs.writeFile('./data/links.json', JSON.stringify(links, null, '\t'), err => { if (err) throw err })

    // Final report

    const format = x => JSON.stringify(x).length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    console.log(`     nodes.json : ${format(nodes)}kb for ${nodes.length} authors`)
    console.log(`     links.json : ${format(links)}kb for ${links.length} links`)
    console.log(`   maxLinkValue : ${maxLinkValue}`)
    console.log(`   minLinkValue : ${minLinkValue}`)
    console.log(`maxCommonTokens : ${maxCommonTokens}`)

}