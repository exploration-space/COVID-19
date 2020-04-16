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

        const obj = {}
        const width = 250
        const height = 50

        obj.canvas = document.createElement('canvas')
        obj.canvas.width = width
        obj.canvas.height = height

        obj.context = obj.canvas.getContext('2d')

        obj.context.fillStyle = s.colors.tokens
        obj.context.font = '10px Arial'
        obj.context.textBaseline = 'middle'
        obj.context.textAlign = 'center'
        obj.context.fillText(token, width / 2, height / 2)

        s.tokens[token] = (x, y, value) => {
            // const scale = value / 2000
            // const scale = 0.5
            // const scaledWidth = width * scale
            // const scaledHeight = height * scale
            x = x - width / 2
            y = y - height / 2
            s.context.drawImage(obj.canvas, x, y)
        }

    })

}