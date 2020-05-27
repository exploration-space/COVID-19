import * as PIXI from 'pixi.js'

import * as d3 from 'd3'
import { SVG } from 'pixi-svg'

import { mouseover, mouseout } from '../mouseover'
import { drawTokens } from './tokens'

const splitInTwo = string => {
    const middle = Math.round(string.length / 2)
    for (let i = middle, j = middle; i < string.length || j >= 0; i++, j--) {
        if (string[i] === ' ') return [string.substring(0, i), string.substring(i + 1)]
        if (string[j] === ' ') return [string.substring(0, j), string.substring(j + 1)]
    }
    return [string, '']
}

let stage

const color = {
    on: 0xFFFFFF,
    off: 0x777777,
}

export function initNodes() {

    const nodes = new PIXI.Graphics()
    stage = s.pixi.addChild(nodes)

    const nodeStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 5,
        fill: color.on,
        align: 'center',
    })

    s.nodes.forEach(node => {



        //     node.visibility = false

        //     // Circle

        //     node.gpxCircle = new PIXI.Graphics()
        //     node.gpxCircle.drawCircle(0, 0, 1)
        //     node.gpxCircle.endFill()
        //     nodes.addChild(node.gpxCircle)

        //     // Label

        //     const [nA, nB] = splitInTwo(node.name)
        //     node.gpxText = new PIXI.Text(`${nA}\n${nB}`, nodeStyle)
        //     node.gpxText.scale.x = .5
        //     node.gpxText.scale.y = .5
        //     nodes.addChild(node.gpxText)

        //     // Interaction

        //     node.gpxCircle.interactive = true
        //     node.gpxCircle.hitArea = new PIXI.Circle(0, 0, s.distance)

        //     // Set information panel & set on circles

        //     node.gpxCircle.mouseover = mouseData => {
        //         mouseover(node)
        //         const include = s.nodes.filter(peer => node.peers.includes(peer.id))
        //         include.forEach(node => node.visibility = true)
        //         drawNodes()
        //         drawTokens()
        //     }

        //     // Clean information panel & set off circles

        //     node.gpxCircle.mouseout = mouseData => {
        //         mouseout(node)
        //         s.nodes.forEach(node => node.visibility = false)
        //         drawNodes()
        //         drawTokens()
        //     }

    })

}

const infinity = new PIXI.Point(Infinity, Infinity)
const projection = d3.geoMercator()
const path = d3.geoPath(projection)

export function drawNodes() {

    stage.clear()

    s.nodes.forEach(node => {

        // node.radius = (node.norm / 150) * 4
        // const clip = projection.clipAngle()
        // projection.clipAngle(179.99);
        // const p = path.pointRadius(node.radius)({
        //     type: "Point",
        //     coordinates: node.spherical
        // })
        // projection.clipAngle(clip)

        // let div = document.createElement('svg');
        // div.innerHTML = `<path d='${p}' />`
        // const svg = new SVG(div)

        // stage.addChild(svg)

        // const { x, y, gpxCircle, gpxText, visibility } = node
        // const origin = new PIXI.Point(x, y)
        // gpxCircle.position = origin
        // gpxCircle.position = origin
        // gpxText.position.set(x - gpxText.width / 2, y + 3)
        // if (visibility) {
        //     gpxCircle.tint = color.on
        //     gpxText.tint = color.on
        // }
        // else {
        //     gpxCircle.tint = color.off
        //     gpxText.tint = color.off
        // }

    })

}