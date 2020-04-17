import * as d3 from 'd3'
import { s } from './state'
import fps from 'fps'

export default () => {

    // Set extent

    s.linkExtent = []

    s.linkExtent[0] = s.links.reduce((min, link) => {
        const tokens = Object.entries(link.tokens)
        for (const [key, value] of tokens) {
            return min < value ? min : value
        }
    }, Infinity)

    s.linkExtent[1] = s.links.reduce((min, link) => {
        const tokens = Object.entries(link.tokens)
        for (const [key, value] of tokens) {
            return min > value ? min : value
        }
    }, 0)

    // Set keyword scale

    s.keywordScale = d3.scaleLinear()
        .domain(s.linkExtent)
        // .range([s.zoomExtent[1] + 1, s.zoomExtent[0] - 5]) // That was the standard
        .range([s.zoomExtent[1], s.zoomExtent[0]])

    // Screen density

    if ('devicePixelRatio' in window && window.devicePixelRatio > 1) {
        s.screen.density = window.devicePixelRatio
    } else s.screen.density = 1
    console.log('screen density:', s.screen.density)

    // Variables

    s.body = document.querySelector('body')
    s.screen.width = s.body.clientWidth * s.screen.density
    s.screen.height = s.body.clientHeight * s.screen.density
    s.canvas = d3.select('#visualization')
    s.context = document.querySelector('#visualization').getContext('2d')

    // Set geopath

    s.geoPath = d3.geoPath().context(s.context)

    // Canvas for nodes

    const side = 20

    const nodeCanvas = document.createElement('canvas')
    nodeCanvas.width = side
    nodeCanvas.height = side

    const nodeContext = nodeCanvas.getContext('2d')
    nodeContext.fillStyle = s.colors.tokens
    nodeContext.font = '40px Arial'
    nodeContext.textBaseline = 'middle'
    nodeContext.textAlign = 'center'
    nodeContext.fillText('●', side / 2, side / 2)

    s.drawNode = (x, y) => {
        s.context.drawImage(nodeCanvas, x - 1, y - 1, 2, 2)
    }

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

    const ticker = fps({
        every: 1
    })

    setInterval(() => {
        ticker.tick()
    }, 1000 / 60)

    const element = document.getElementById('fps')

    ticker.on('data', function (framerate) {
        element.innerHTML = Math.floor(parseInt(framerate))
    })

}