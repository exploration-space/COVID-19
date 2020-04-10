
// Libraries

const fs = require('fs')
const csv = require('csv-parser')

// Reading data

const results = []
fs.createReadStream('./data/metadata.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => parse(results))

// Parsing

const trimLeft = (str) => {
    if (!str) return str;
    return str.replace(/^\s+/g, '');
}

const trimRight = (str) => {
    if (!str) return str;
    return str.replace(/\s+$/g, '');
}

const parse = (records) => {

    // Check length limit
    
    // const toolong = records.reduce((int, r) => {
    //     if (r.abstract.length > 3000)
    //         int = int + 1
    //     return int
    // }, 0)
    // console.log('-', toolong)
    
    // Name treatment

    records = records.reduce((records, record) => {

        const max = 3000
        if (record.abstract.length > max)
            return records

        record.authors = record.authors.split('; ').reduce((authors, author) => {
            let string = `${author.split(', ')[1]} ${author.split(', ')[0]}`
            string = trimLeft(string)
            string = trimRight(string)
            authors.push(string)
            return authors
        }, [])
        records.push(record)
        return records
    }, [])

    // Grouping by author

    const authors = records
        // .slice(0, 1000) // Trim for testing
        .reduce((authors, record, i) => {

            console.log('Grouping record #', i)

            record.authors.forEach(author => {

                if (author == 'undefined') return

                const existence = authors.some(a => a.name === author)
                const text = `${record.title.toLowerCase()} ${record.abstract.toLowerCase()} `

                if (existence) {
                    let _author = authors.filter(a => a.name === author)
                    _author[0].docs++
                    _author[0].text += text
                } else {
                    const _author = {
                        name: author,
                        docs: 1,
                        text: text
                    }
                    authors.push(_author)
                }

            })

            return authors

        }, [])

    // Shorten list

    // authors = authors.reduce((array, author) => {
    //     const min = 20
    //     if (author.docs > min)
    //         array.push(author)
    //     return array
    // }, [])

    // Write JSON

    fs.writeFile('./data/authors.json', JSON.stringify(authors, null, '\t'), err => {
        if (err) throw err
    })

}