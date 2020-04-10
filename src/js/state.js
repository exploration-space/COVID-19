import * as d3 from 'd3'

const fontSizeKeywords = 1.2

export let s = {

    distance: 30,
    densityData: [],
    zoomState: null,
    zoomExtent: [1, 8],
    screen: {},

    colors: {
        gradientA: d3.rgb(0, 0, 0),
        gradientB: d3.rgb(60, 60, 60),
        contours: d3.rgb(255, 255, 255, .2),
        keywords: d3.rgb(255, 255, 255, .2),
        nodes: d3.rgb(200, 200, 200), // Grigio
        // nodes: d3.rgb(216, 169, 21), // Giallo Cattolica
        // nodes: d3.rgb(216, 21, 21), // Rosso Coronavirus
    },

    setVariables: () => {

        s.linkExtent = [
            s.links.reduce((min, link) => {
                const tokens = Object.entries(link.tokens)
                for (const [key, value] of tokens) {
                    return min < value ? min : value
                }
            }, Infinity),
            s.links.reduce((min, link) => {
                const tokens = Object.entries(link.tokens)
                for (const [key, value] of tokens) {
                    return min > value ? min : value
                }
            }, 0)
        ]

        s.keywordScale = d3.scaleLinear()
            .domain(s.linkExtent)
            .range([s.zoomExtent[1] + 1, s.zoomExtent[0] - 5])

        s.geoPath = d3.geoPath().context(s.context)

    },

    setScreen: () => {

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
        s.backgroud = d3.select('#background')
        s.bgContext = document.querySelector('#background').getContext('2d', { alpha: false })
        // s.gradient = s.bgContext.createLinearGradient(0, 0, s.screen.width / 2, 0)
        s.gradient = s.bgContext.createRadialGradient(
            s.screen.width / 2, s.screen.height / 2, 0,
            s.screen.width / 2, s.screen.height / 2, s.screen.width / 2)

    },

}