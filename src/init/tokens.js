export default () => {

    // Variables for tokens

    // const max = 1
    const rounding = 0
    
    // Not sure this Pytagora application is working

    s.distanceExtension = {
        min: Math.pow(s.distance, 2) - rounding,
        max: Math.pow(s.distance * 2, 2) + rounding
    }

    // let rectangles = []

    // Canvas for tokens

    const tokens = s.nodes.reduce((array, node) => {
        let i = 0
        for (let token in node.tokens) {
            if (!array.includes('token')) array.push(token)
            if (++i == 3) break
        }
        return array
    }, [])

    console.log(tokens)

    tokens.forEach(token => {

        const width = 250
        const height = 40

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')
        context.fillStyle = s.colors.tokens
        context.font = '40px Arial'
        context.textBaseline = 'middle'
        context.textAlign = 'center'
        context.fillText(token, width / 2, height / 2)

        s.tokens[token] = (x, y, value) => {
            const scale = value / 2000
            const scaledWidth = Math.floor(width * scale)
            const scaledHeight = Math.floor(height * scale)
            x = x - scaledWidth / 2
            y = y - scaledHeight / 2
            s.context.drawImage(canvas, x, y, scaledWidth, scaledHeight)
        }

    })

    // Set keyword scale

    // s.keywordScale = d3.scaleLinear()
    //     .domain(s.linkExtent)
    //     // .range([s.zoomExtent[1] + 1, s.zoomExtent[0] - 5]) // That was the standard
    //     .range([s.zoomExtent[1], s.zoomExtent[0]])

}