import * as d3 from 'd3'
import background from '../draw/background'
import ticked from '../simulation/ticked'

export default () => {

    const radius = 20

    const hover = () => {

        const x = s.zoomState.invertX(event.x) * s.screen.density
        const y = s.zoomState.invertY(event.y) * s.screen.density

        const left = d3.select('#focus .left')
        const middle = d3.select('#focus .middle')
        const right = d3.select('#focus .right')
        let hover = false

        s.nodes.forEach(node => {

            const dx = x - node.x
            const dy = y - node.y
            const pythagoras = dx * dx + dy * dy < radius * radius
            const block = '<span class="block"></span>'

            // console.log(pythagoras)
            if (pythagoras) {

                // This set hover element
                s.node = node

                hover = true
                const space = '<tr style="height:10px"><td></td><td></td></tr>'
                const line = '<tr><th colspan="2"><hr></th></tr>'

                let table = '<table>'
                table += `<tr><td style="width:80px"></td><td style="width:80px"></td></tr>`
                table += `<tr><td colspan="2" style="text-align:center;"><h1>${node.name}</h1></td></tr>`
                table += `<tr><td colspan="2" style="text-align:center;">${node.docs} publications</td></tr>`
                table += space

                table += '<tr><td colspan="2" style="text-align:center;">Tokens by tf-idf</td></tr>'
                table += line
                table += Object.entries(node.tokens).reduce((tokens, token, i) => {
                    // if (i < 20) {
                    const repetition = token[1] / 10
                    const blocks = block.repeat(repetition)
                    tokens += `<tr><td style="text-align: right;">${token[0]}</td><td>${blocks}</td></tr>`
                    // }
                    return tokens
                }, [])
                table += '</table>'
                right.html(table)

                table = '<table>'
                table += '<tr><td style="text-align:center;">List of co-authors</td></tr>'
                table += line
                node.peers.forEach(id => {
                    const peer = s.nodes.find(node => node.id == id)
                    if (typeof peer != 'undefined')
                        table += `<tr><td>${peer.name}</td></tr>`
                })
                table += '</table>'
                middle.html(table)

                table = '<table>'
                table += `<tr><td style="width:20px"></td><td style="width:50px"></td></tr>`
                table += '<tr><td colspan="2" style="text-align:center;">Publications by year</td></tr>'
                table += line
                for (let year = s.ext.years.min; year <= s.ext.years.max; year++) {
                    const undefined = typeof node.years[year] == 'undefined'
                    const repetition = undefined ? 0 : node.years[year] * 2
                    const blocks = block.repeat(repetition)
                    table += `<tr><td style="text-align: right;">${year}</td><td>${blocks}</td></tr>`
                }
                table += '</table>'
                left.html(table)

            }
        })

        background()
        ticked()

        if (!hover) {
            left.html('')
            middle.html('')
            right.html('')
            s.node = null
        }

    }

    s.canvas.on('mousemove', hover)
}