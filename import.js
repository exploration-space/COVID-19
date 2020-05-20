// Libraries

const fs = require('fs')
const csv = require('csv-parser')
const natural = require('natural')
const accents = require('remove-accents')

// Time counter

const start = Date.now()

// Reading data

const results = []
fs.createReadStream('./data/metadata.csv').pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => parse(results))

// Parsing

const parse = (records) => {

    // Filtering and inversion

    records = records.reduce((records, record) => {

        record.authors = record.authors.split('; ')

        // Filter

        if (record.abstract.length > 3000) return records
        if (record.authors.length > 10) return records

        // Clean authors

        record.authors = record.authors.reduce((authors, author) => {
            let string = author
            string = string.normalize('NFC')
            string = `${string.split(', ')[1]} ${string.split(', ')[0]}`
            string = string.trim()
            string = accents.remove(string)
            string = string.replace(/\s\s+/g, ' ') // Replace multiple spaces
            string = string.replace('undefined ', '') // Clean names already switched
            if (string == 'undefined') return authors
            // string = string.replace(/\./g, '') // remove dots
            authors.push(string)
            return authors
        }, [])

        // Filter

        if (record.authors.length == 0) return records

        // Add

        records.push(record)
        return records

    }, [])

    // All authors

    const names = records.reduce((a, record) => {
        a.push(...record.authors)
        return a
    }, []).filter((v, i, a) => a.indexOf(v) === i)

    console.log(names.length)

    // 115451

    let authors = names.reduce((o, name, i) => {
        
        const same = o.find(el => el.name === name || el.variants.includes(name))
        if (same) return o
        
        const similar = o.find(el => natural.DiceCoefficient(el.name, name) > .9)
        if (similar)
            similar.variants.push(name)
        else {
            o.push({
                name: name,
                variants: []
            })
        }
        return o
    }, [])


    // Grouping by author

    // let idCounter = 0

    // const authors = records
    //     .slice(0, 500) // Trim for testing
    //     .reduce((authors, record, i) => {

    //         console.log('Grouping record #', records.length - i)

    //         const year = parseInt(record.publish_time.split('-')[0])
    //         const title = record.title.toLowerCase()
    //         const abstract = record.abstract.toLowerCase()
    //         const text = `${title} ${abstract} `

    //         const update = author => {
    //             author.docs++
    //             author.text += text
    //             if (author.years[year]) author.years[year]++
    //             else author.years[year] = 1
    //         }

    //         record.authors.forEach(name => {

    //             // Update same

    //             const same = authors.find(a => a.name === name || a.variants.includes(name))
    //             if (same) {
    //                 update(same)
    //                 return
    //             }

    //             // Update similar

    //             const similar = authors.find(a => natural.DiceCoefficient(a.name, name) > .9)
    //             if (similar) {
    //                 update(similar)
    //                 return
    //             }

    //             // Create new

    //             authors.push({
    //                 id: idCounter++,
    //                 name: name,
    //                 docs: 1,
    //                 years: {
    //                     [year]: 1
    //                 },
    //                 peers: [],
    //                 variants: [],
    //                 text: text
    //             })

    //         })

    //         return authors

    //     }, [])

    // Transform authors into ids

    // records.forEach((record, i) => {
    //     // console.log('Setting peers for record #', records.length - i)
    //     // console.log(record.authors)
    //     // To fix with variations
    //     const peers = authors.filter(author => record.authors.includes(author.name))
    //     const ids = peers.map(author => author.id)

    //     peers.forEach(peer => {
    //         ids.forEach(id => {
    //             if (!peer.peers.includes(id)) peer.peers.push(id)
    //         })
    //     })

    // })

    // Time end

    const end = Date.now()
    const d = new Date(end - start)
    console.log(`Time computed ${d.getUTCMinutes()}m ${d.getUTCSeconds()}s ${d.getUTCMilliseconds()}ms`)

    // Write JSON

    fs.writeFile('./data/authors.json', JSON.stringify(authors, null, '\t'), err => {
        if (err) throw err
    })






}