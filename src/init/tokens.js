export default () => {

    // Variables

    s.ext.distance = {
        min: Math.pow(s.distance * s.screen.density / 2, 2),
        max: Math.pow(s.distance * s.screen.density, 2)
    }

    // let rectangles = []

    // Canvas for tokens

    s.array.tokens = s.nodes.reduce((array, node) => {
        let i = 0
        const limit = 1
        for (let token in node.tokens) {
            if (!array.includes('token')) array.push(token)
            if (++i == limit) break
        }
        return array
    }, [])

    // console.log(tokens)

    // tokens.forEach(token => {

    //     const width = 250
    //     const height = 40

    //     const canvas = document.createElement('canvas')
    //     canvas.width = width
    //     canvas.height = height

    //     const context = canvas.getContext('2d')
    //     context.fillStyle = s.colors.tokens
    //     context.font = '40px Arial'
    //     context.textBaseline = 'middle'
    //     context.textAlign = 'center'

    //     const x = Math.floor(width / 2)
    //     const y = Math.floor(height / 2)
    //     context.fillText(token, x, y)

    //     s.tokens[token] = (x, y, value) => {

    //         const scale = 2000
    //         const scaledWidth = Math.floor(width * value / scale)
    //         const scaledHeight = Math.floor(height * value / scale)

    //         x = x - Math.floor(scaledWidth / 2)
    //         y = y - Math.floor(scaledHeight / 2)

    //         s.context.drawImage(canvas, x, y, scaledWidth, scaledHeight)

    //     }

    // })

    // Set keyword scale

    // s.keywordScale = d3.scaleLinear()
    //     .domain(s.linkExtent)
    //     // .range([s.zoomExtent[1] + 1, s.zoomExtent[0] - 5]) // That was the standard
    //     .range([s.zoomExtent[1], s.zoomExtent[0]])

}