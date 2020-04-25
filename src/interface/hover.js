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

            if (dx * dx + dy * dy < radius * radius) {

                hover = true

                let tokens = Object.entries(node.tokens).reduce((tokens, token) => {
                    if (tokens.length < 20)
                        tokens.push(`${token[0]} (${token[1]})`)
                    return tokens
                }, []).join('<br/>')

                let years = Object.entries(node.years).reduce((years, year) => {
                    years.push(`${year[0]} (${year[1]})`)
                    return years
                }, []).join('<br/>')

                const name = node.name
                const docs = node.docs

                let text = `<h2><strong>${name}</strong></h2>`
                text += `<p>Number of papers: ${docs}</p>`
                text += `<p>Tokens:<br/>${tokens}</p>`
                text += `<p>Publication years:<br/>${years}</p>`
                focus.html(text)

            }
        })

        if (!hover) {
            focus.html('')
        }

    }

    s.canvas.on('mousemove', hover)
}