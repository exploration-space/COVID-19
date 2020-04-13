import * as d3 from 'd3'
import { s } from './state'

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

}