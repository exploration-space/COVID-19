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
    // const inflector = new natural.NounInflector()
    // const safeList = ['curpus']
    // authors.forEach((author, i) => author.tokens = author.tokens.map((t, j) => {
    //     console.log('Singularizing author/token #', i, t)
    //     return safeList.includes(t) ? t : inflector.singularize(t)
    // }))

    // TF-IDF
    const tokenFrequency = new natural.TfIdf()
    authors.forEach((author, i) => {
        console.log('Frequencing for author #', i)
        tokenFrequency.addDocument(author.tokens)
    })

    // Reduction and shaping

    const tfidfLimit = 10
    authors.forEach((item, i) => {
        console.log('Reducing for author #', i)
        item.tokens = tokenFrequency.listTerms(i)
            .filter(el => el.tfidf > tfidfLimit) // On threshold
            .slice(0, tfidfLimit) // On top elements
            .reduce((obj, el) => {
                obj[el.term] = el.tfidf
                return obj
            }, {})
    })

    // Set nodes

     const nodes = authors.reduce((array, author, i) => {
		delete author.text
        author.id = i
        array.push(author)
        return array
    }, [])

    fs.writeFile('./src/data/nodes.json', JSON.stringify(nodes), err => { if (err) throw err })
    fs.writeFile('./data/nodes.json', JSON.stringify(nodes, null, '\t'), err => { if (err) throw err })
    
    // Set links

    const pairs = combinatorics.bigCombination(authors, 2)
    const links = []
    let i = pairs.length
    let maxCommonTokens = 0

    pairs.forEach(pair => {

        const p1 = pair[0], p2 = pair[1]
        const t1 = p1.tokens, t2 = p2.tokens
        const tokens = Object.keys(p1.tokens).filter(n => Object.keys(p2.tokens).includes(n))
        maxCommonTokens = maxCommonTokens > tokens.length ? maxCommonTokens : tokens.length
        console.log('#' + i--, '|', tokens.length, 'terms between', p2.name, 'and', p1.name)

        tokens.forEach(token => {

            const link = links.find(link => link.source === p1.id && link.target === p2.id)
            const value = t1[token] + t2[token]

            if (link) {
                link.value += value
                link.tokens[token] = value
            } else {
                links.push({
                    source: p1.id,
                    target: p2.id,
                    value: value,
                    tokens: {
                        [token]: value,
                    }
                })
            }
        })
    })

    // Normalizing values between [0,1]

    const maxLinkValue = links.reduce((max, link) => max > link.value ? max : link.value, 0)
    const minLinkValue = links.reduce((min, link) => min < link.value ? min : link.value, 100000)
    links.forEach(link => link.value = link.value / maxLinkValue)
    
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