import * as d3 from 'd3'

export default () => {

    const radius = 10

    const hover = () => {

        const x = s.zoomState.invertX(event.x) * s.screen.density
        const y = s.zoomState.invertY(event.y) * s.screen.density

        const focus = d3.select('#focus')
        let hover = false

        s.nodes.forEach(node => {

            const dx = x - node.x
            const dy = y - node.y
            const pythagoras = dx * dx + dy * dy < radius * radius
            const block = '<span class="block"></span>'

            // console.log(pythagoras)
            if (pythagoras) {

                hover = true
                const space = '<tr style="height:10px"><td></td><td></td></tr>'
                const line = '<tr><th colspan="2"><hr></th></tr>'

                let table = '<table>'

                table += `<tr><td style="width:60px"></td><td style="width:80px"></td></tr>`
                
                table += `<tr><td colspan="2" style="text-align:center;">${node.name}</td></tr>`
                table += space

                table += `<tr><td colspan="2" style="text-align:center;">${node.docs} publications</td></tr>`
                table += space

                table += '<tr><td class="right">Token</td><td>TF-IDF</td></tr>'
                table += line
                table += Object.entries(node.tokens).reduce((tokens, token, i) => {
                    if (i < 20) {
                        const repetition = token[1] / 10
                        const blocks = block.repeat(repetition)
                        tokens += `<tr><td class="right">${token[0]}</td><td>${blocks}</td></tr>`
                    }
                    return tokens
                }, [])
                table += space

                table += '<tr><td class="right">Year</td><td>Publications</td></tr>'
                table += line
                table += Object.entries(node.years).reduce((years, year) => {
                    const repetition = year[1] * 2
                    const blocks = block.repeat(repetition)
                    years += `<tr><td class="right">${year[0]}</td><td>${blocks}</td></tr>`
                    return years
                }, [])

                table += '</table>'

                // const name = node.name
                // const docs = node.docs
                // let text = `<h2><strong>${name}</strong></h2>`
                // text += `<p>Number of papers: ${docs}</p>`
                // text += `<p>${tokens}</p>`
                // text += `<p>Publication years:<br/>${years}</p>`

                focus.html(table)

            }
        })

        // if (!hover) {
        //     focus.html('')
        // }

    }

    s.canvas.on('mousemove', hover)
}