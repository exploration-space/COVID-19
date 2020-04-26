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

                let tokens = '<table>'
                tokens += '<tr><td class="right">Token</td><td>TF-IDF</td></tr>'
                
                tokens += Object.entries(node.tokens).reduce((tokens, token) => {
                    const repetition = token[1] / 10
                    const blocks = block.repeat(repetition)
                    // table.append
                    // console.log(token[1], blocks)
                    tokens += `<tr><td class="right">${token[0]}</td><td>${blocks}</td></tr>`
                    return tokens
                }, [])
                // .join('<br/>')
                tokens += '</table>'

                let years = Object.entries(node.years).reduce((years, year) => {
                    years.push(`${year[0]} (${year[1]})`)
                    return years
                }, []).join('<br/>')

                const name = node.name
                const docs = node.docs

                let text = `<h2><strong>${name}</strong></h2>`
                text += `<p>Number of papers: ${docs}</p>`



                text += `<p>${tokens}</p>`

                text += `<p>Publication years:<br/>${years}</p>`
                focus.html(text)

            }
        })

        // if (!hover) {
        //     focus.html('')
        // }

    }

    s.canvas.on('mousemove', hover)
}