// CSS

import '../node_modules/normalize.css/normalize.css'
import './index.css'

// Libraries

import * as d3 from 'd3'

// Data

import nodes from './data/nodes.json'
import links from './data/links.json'

import search from './search'

// Init

import initPixi from './elements/pixi.js'
import initFps from './elements/fps.js'
import { initContours } from './elements/contours.js'
import { initLinks } from './elements/links.js'
import { initNodes } from './elements/nodes.js'
import { initTokens } from './elements/tokens.js'
import background from './elements/background'
import { simulation } from './elements/simulation'

// Global variables

window.d3 = d3

window.s = {
    distance: 30,
    links,
    nodes,
}

// Start

Promise.all([
    d3.json(nodes),
    d3.json(links)

]).then(([nodes, links]) => {

    s.links = links
    s.nodes = nodes
    console.log('nodes', s.nodes.length)
    console.log('links', s.links.length)

    initPixi()
    initFps()

    initContours()
    initLinks()
    initNodes()
    initTokens()

    background()
    simulation()
    search()

})