import * as d3 from 'd3'

const space = '<tr style="height:10px"><td></td><td></td></tr>'
const line = '<tr><th colspan="2"><hr></th></tr>'
const block = '<span class="block"></span>'
let focus = d3.select('#focus')


export function mouseover(node) {

    const yearsList = s.nodes.map(node => Object.keys(node.years).map(Number)).flat()
    const min = Math.min(...yearsList)
    const max = Math.max(...yearsList)

    // const focus = document.createElement('div')
    // focus.id = 'focus'
    // const body = document.querySelector('body')
    // body.append(focus)

    // const left = document.createElement('div')
    // const middle = document.createElement('div')
    // const right = document.createElement('div')

    // left.className = 'left'
    // middle.className = 'middle'
    // right.className = 'right'

    // Tokens

    let table, tr, td

    table = focus.append('table')
    tr = table.append('tr')
    tr.append('td').style('width', '80px')
    tr.append('td').style('width', '80px')
    table.append('tr').attr('colspan', 2).html(node.name)
    table.append('tr').attr('colspan', 2).html(node.docs + ' Publications')
    table.append('tr').html(space)
    table.append('tr').attr('colspan', 2).html('Tokens by tf-idf')
    table.append('tr').html(line)
    Object.entries(node.tokens).forEach(([key, value], i) => {
        if (i < 10) {
            tr = table.append('tr')
            tr.append('td').html(key)
            tr.append('td').html(block.repeat(value/10))
        }
            
    })

    // Peers

    table = focus.append('table')
    tr = table.append('tr')
    tr.append('td').style('width', '80px')
    tr.append('td').style('width', '80px')
    table.append('tr').attr('colspan', 2).html('List of co-authors')
    table.append('tr').html(line)
    // peers += line
    // node.peers.forEach(id => {
    //     const peer = s.nodes.find(node => node.id == id)
    //     if (typeof peer != 'undefined')
    //         peers += `<tr><td>${peer.name}</td></tr>`
    // })
    // peers += '</table>'

    // // Years

    // let years = '<table>'
    // years += `<tr><td style="width:20px"></td><td style="width:50px"></td></tr>`
    // years += '<tr><td colspan="2" style="text-align:center;">Publications by year</td></tr>'
    // years += line
    // for (let year = min; year <= max; year++) {
    //     const undefined = typeof node.years[year] == 'undefined'
    //     const repetition = undefined ? 0 : node.years[year] * 2
    //     const blocks = block.repeat(repetition)
    //     years += `<tr><td style="text-align: right;">${year}</td><td>${blocks}</td></tr>`
    // }
    // years += '</table>'

    // // console.log(years)
    // // console.log(tokens)
    // // console.log(peers)

    // left.insertAdjacentHTML('beforeend', years)
    // middle.insertAdjacentHTML('beforeend', peers)
    // right.insertAdjacentHTML('beforeend', tokens)

    // focus.append(left)
    // focus.append(middle)
    // focus.append(right)

}

export function mouseout() {

    focus.html('')

}