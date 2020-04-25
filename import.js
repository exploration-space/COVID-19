// Libraries

const fs = require('fs')
const csv = require('csv-parser')

// Reading data

const results = []
fs.createReadStream('./data/metadata.csv').pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => parse(results))

// Parsing

const trimLeft = str => (!str) ? str : str.replace(/^\s+/g, '')
const trimRight = str => (!str) ? str : str.replace(/\s+$/g, '')

const parse = (records) => {

    // cleaning of strings

    records = records.reduce((records, record) => {

        // Check length limit as some papers have the full text

        if (record.abstract.length > 3000) return records

        // Cleaning and inversion

        record.authors = record.authors.split('; ').reduce((authors, author) => {
            let string = `${author.split(', ')[1]} ${author.split(', ')[0]}`
            string = trimLeft(trimRight(string))
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

            const year = parseInt(record.publish_time.split('-')[0])
            const text = `${record.title.toLowerCase()} ${record.abstract.toLowerCase()} `

            record.authors.forEach(name => {

                if (name == 'undefined') return

                const author = authors.find(a => a.name === name)

                // Create a new author
                if (!author) {
                    const _author = {
                        name: name,
                        docs: 1,
                        years: Array(1).fill(year),
                        text: text,
                    }
                    authors.push(_author)
                }

                // Update an author
                else {
                    author.docs++
                    author.years.push(year)
                    author.text += text
                }

            })

            return authors

        }, [])

    // Write JSON

    fs.writeFile('./data/authors.json', JSON.stringify(authors, null, '\t'), err => {
        if (err) throw err
    })

}