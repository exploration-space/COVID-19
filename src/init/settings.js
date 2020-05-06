import * as d3 from 'd3'

export let s = {

    distance: 30,
    densityData: [],
    zoomState: null,
    zoomExtent: [1, 8],
    screen: {},

    ext: {},
    array: {},

    colors: {
        gradientA: d3.rgb(0, 0, 0),
        gradientB: d3.rgb(60, 60, 60),
        contours: d3.rgb(255, 255, 255, .5),
        tokens: d3.rgb(255, 255, 255, .5),
        nodes: d3.rgb(255, 255, 255, .5), // Grigio
    },

    tokens: {}

}