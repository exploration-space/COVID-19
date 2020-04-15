import * as d3 from 'd3'
import { s } from './state'
import { json } from 'd3'

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

    // Canvas for one node

    const nodeCanvas = document.createElement('canvas')
    const nodeContext = nodeCanvas.getContext('2d')
    nodeContext.width = 10
    nodeContext.height = 10
    nodeContext.fillStyle = s.colors.nodes
    nodeContext.arc(10, 10, 10, 0, 2 * Math.PI)
    nodeContext.fill()

    s.drawNode = (x, y) => {
        const scale = .1
        s.context.drawImage(nodeCanvas, x - 1, y - 1, nodeCanvas.width * scale, nodeCanvas.height * scale)
        // setTimeout(s.drawNode, 1000 / 60)
    }

    // Canvas for keywords

    const tokens = s.nodes.reduce((array, node) => {
        let i = 0
        for (let token in node.tokens) {
            if (!array.includes('token')) array.push(token)
            if (++i == 2) break
        }
        return array
    }, [])

    console.log(tokens)

    tokens.forEach(token => {

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = 500
        canvas.height = 100
        // context.height = 1
        // console.log(canvas.height, context.measureText('M').width)
        // canvas.width = context.measureText(token).width * 1.5
        // canvas.height = context.measureText('M').width
        context.fillStyle = s.colors.tokens
        context.font = '100px Arial'
        context.textBaseline = 'top'
        // context.textAlign = 'center'
        context.fillText(token, 0, 0)

        s.tokens[token] = (x, y, value) => {
            const scale = value / 5000
            const width = Math.floor(canvas.width * scale)
            const height = Math.floor(canvas.height * scale)
            s.context.drawImage(canvas, x, y, width, height)
        }

    })

}