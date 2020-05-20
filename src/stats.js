export default () => {

    let attr

    console.log('TOP20 BY RELEVANCY')
    attr = 'relevancy'
    s.nodes.filter(n => n[attr] > 4200)
        .sort((a, b) => {
            if (a[attr] > b[attr]) return -1
            return a[attr] < b[attr] ? 1 : 0
        })
        .forEach(({ name, relevancy }, i) => {
            console.log(`${i}\t${relevancy}\t${name}`)
        })

    console.log('TOP20 BY PUBLICATIONS')
    attr = 'docs'
    s.nodes.filter(n => n[attr] > 68)
        .sort((a, b) => {
            if (a[attr] > b[attr]) return -1
            return a[attr] < b[attr] ? 1 : 0
        })
        .forEach(({ name, docs }, i) => {
            console.log(`${i}\t${docs}\t${name}`)
        })

    console.log('TOP20 BY PEERS')
    attr = 'coauthors'
    s.nodes.forEach(node => node[attr] = node.peers.length)
    s.nodes.filter(n => n[attr] > 380)
        .sort((a, b) => {
            if (a[attr] > b[attr]) return -1
            return a[attr] < b[attr] ? 1 : 0
        })
        .forEach(({ name, coauthors }, i) => {
            console.log(`${i}\t${coauthors}\t${name}`)
        })



}