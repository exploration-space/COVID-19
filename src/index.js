// require('!style-loader!css-loader!marx-css/css/marx.css')
import * as d3 from 'd3'
import { s } from './settings'
import style from './static/style.css'
import nodes from './static/nodes.json'
import links from './static/links.json'
import simulation from './simulation/simulation'
import hover from './interface/hover'
import search from './interface/search'
import background from './draw/background'
import initMain from './init/main.js'
import initTokens from './init/tokens.js'
import initNodes from './init/nodes.js'
import initContours from './init/contours.js'
import initFps from './init/fps.js'

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
    initNodes()
    initTokens()
    initContours()
    initFps()

    background()
    simulation()
    hover()
    search()

})