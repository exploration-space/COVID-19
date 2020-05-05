import './interface/main.css'

import * as d3 from 'd3'
import { s } from './init/settings'
import nodes from './data/nodes.json'
import links from './data/links.json'
import { simulation } from './elements/simulation'
import search from './interface/search'
// import background from './elements/background'

import initMain from './init/main.js'
import initPixi from './init/pixi.js'
import initFps from './init/fps.js'

import { initContours } from './elements/contours.js'
import { initLinks } from './elements/links.js'
import { initNodes } from './elements/nodes.js'
import { initTokens } from './elements/tokens.js'

window.d3 = d3
window.s = s

Promise.all([
    d3.json(nodes),
    d3.json(links)

]).then(([nodes, links]) => {

    s.links = links
    s.nodes = nodes
    console.log('nodes', s.nodes.length)
    console.log('links', s.links.length)

    initMain()
    initPixi()
    initFps()

    initContours()
    initLinks()
    initNodes()
    initTokens()

    // background()
    simulation()
    // search()

})