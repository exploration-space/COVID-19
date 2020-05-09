import * as d3 from 'd3'

const space = '&nbsp;'
const line = '—————————————'
const block = '<span class="block"></span>'


export function mouseover(node) {

    const focus = d3.select('body').append('div').attr('id', 'focus')

    // Heading

    focus.append('h2').html(node.name)
    focus.append('h3').html(`${node.docs} Publications`)
    focus.append('h3').html(`Ethnicity: ${node.ethnicity}`)

    // Tokens

    focus.append('p').html(space)
    focus.append('h3').html('Tokens by tf-idf')
    focus.append('p').html(line)
    Object.entries(node.tokens).forEach(([key, value], i) => {
        if (i < 10) {
            const blocks = block.repeat(value / 10)
            focus.append('p').html(`${blocks} &nbsp; ${key}`)
        }
    })

    // Ethnicity

    focus.append('p').html(space)
    focus.append('h3').html('Co-author Ethnicity')
    focus.append('p').html(line)
    Object.entries(node.ethnicities).sort().forEach(([key, value], i) => {
        const blocks = block.repeat(value * 4)
        focus.append('p').html(`${blocks} &nbsp; ${key}`)
    })

    // Years

    focus.append('p').html(space)
    focus.append('h3').html('Publication Years')
    focus.append('p').html(line)

    Object.entries(node.years).forEach(([key, value], i) => {
        const blocks = block.repeat(value * 4)
        focus.append('p').html(`${blocks} &nbsp; ${key}`)
    })

}

export function mouseout() {

    d3.select('#focus').remove()

}