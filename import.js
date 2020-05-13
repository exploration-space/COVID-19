// Libraries

const fs = require('fs')
const csv = require('csv-parser')

// Reading data

const results = []
fs.createReadStream('./data/metadata.csv').pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => parse(results))

// Parsing

const parse = (records) => {

    // Filtering and inversion

    records = records.reduce((records, record) => {

        // Filter by abstract's length
        if (record.abstract.length > 3000) return records

        // Inversion
        record.authors = record.authors.split('; ').reduce((authors, author) => {
            let string = `${author.split(', ')[1]} ${author.split(', ')[0]}`
            authors.push(string.trim())
            return authors
        }, [])

        // Filter by author's number
        if (record.authors.length < 2000)
            records.push(record)

        return records

    }, [])

    // Grouping by author

    let idCounter = 0

    const authors = records
        // .slice(0, 10) // Trim for testing
        .reduce((authors, record, i) => {

            console.log('Grouping record #', records.length - i)

            const year = parseInt(record.publish_time.split('-')[0])
            const text = `${record.title.toLowerCase()} ${record.abstract.toLowerCase()} `

            record.authors.forEach(name => {

                if (name == 'undefined') return

                const author = authors.find(a => a.name === name)

                // Create a new author
                if (!author) {
                    const _author = {
                        id: idCounter++,
                        name: name,
                        docs: 1,
                        years: {
                            [year]: 1
                        },
                        peers: [],
                        text: text
                    }
                    authors.push(_author)
                }

                // Update an author
                else {
                    author.docs++
                    author.text += text
                    author.years[year] = (author.years[year]) ?
                        author.years[year]++ : 1
                }

            })

            return authors

        }, [])

    // Transform authors into ids

    records.forEach((record, i) => {
        console.log('Setting peers for record #', records.length - i)
        // console.log(record.authors)
        const peers = authors.filter(author => record.authors.includes(author.name))
        const ids = peers.map(author => author.id)

        peers.forEach(peer => {
            ids.forEach(id => {
                if (!peer.peers.includes(id)) peer.peers.push(id)
            })
        })

    })

    // Write JSON

    fs.writeFile('./data/authors.json', JSON.stringify(authors, null, '\t'), err => {
        if (err) throw err
    })

}