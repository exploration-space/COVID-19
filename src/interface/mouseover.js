
const space = '<tr style="height:10px"><td></td><td></td></tr>'
const line = '<tr><th colspan="2"><hr></th></tr>'
const block = '<span class="block"></span>'


export function mouseover(node) {

    console.log(node)

    const focus = document.createElement('div')
    focus.id = 'focus'
    const body = document.querySelector('body')
    body.append(focus)

    const left = document.createElement('div')
    const middle = document.createElement('div')
    const right = document.createElement('div')

    left.className = 'left'
    middle.className = 'middle'
    right.className = 'right'

    // Tokens

    let tokens = '<table>'
    tokens += `<tr><td style="width:80px"></td><td style="width:80px"></td></tr>`
    tokens += `<tr><td colspan="2" style="text-align:center;"><h1>${node.name}</h1></td></tr>`
    tokens += `<tr><td colspan="2" style="text-align:center;">${node.docs} publications</td></tr>`
    tokens += space
    tokens += '<tr><td colspan="2" style="text-align:center;">Tokens by tf-idf</td></tr>'
    tokens += line
    tokens += Object.entries(node.tokens).reduce((tokens, token, i) => {
        if (i < 20) {
            const repetition = token[1] / 10
            const blocks = block.repeat(repetition)
            tokens += `<tr><td style="text-align: right;">${token[0]}</td><td>${blocks}</td></tr>`
        }
        return tokens
    }, [])
    tokens += '</table>'

    // Peers

    let peers = '<table>'
    peers += '<tr><td style="text-align:center;">List of co-authors</td></tr>'
    peers += line
    node.peers.forEach(id => {
        const peer = s.nodes.find(node => node.id == id)
        if (typeof peer != 'undefined')
        peers += `<tr><td>${peer.name}</td></tr>`
    })
    peers += '</table>'

    // Years

    let years = '<table>'
    years += `<tr><td style="width:20px"></td><td style="width:50px"></td></tr>`
    years += '<tr><td colspan="2" style="text-align:center;">Publications by year</td></tr>'
    years += line
    for (let year = s.ext.years.min; year <= s.ext.years.max; year++) {
        const undefined = typeof node.years[year] == 'undefined'
        const repetition = undefined ? 0 : node.years[year] * 2
        const blocks = block.repeat(repetition)
        years += `<tr><td style="text-align: right;">${year}</td><td>${blocks}</td></tr>`
    }
    years += '</table>'

    // console.log(years)
    // console.log(tokens)
    // console.log(peers)

    left.insertAdjacentHTML('beforeend', years)
    middle.insertAdjacentHTML('beforeend', peers)
    right.insertAdjacentHTML('beforeend', tokens)

    focus.append(left)
    focus.append(middle)
    focus.append(right)

}

export function mouseout() {

    document.querySelector('#focus').remove()

}