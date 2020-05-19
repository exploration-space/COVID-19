import { mouseover, mouseout } from '../mouseover'
import * as PIXI from 'pixi.js'

const splitInTwo = string => {
    const middle = Math.round(string.length / 2)
    for (let i = middle, j = middle; i < string.length || j >= 0; i++, j--) {
        if (string[i] === ' ') return [string.substring(0, i), string.substring(i + 1)]
        if (string[j] === ' ') return [string.substring(0, j), string.substring(j + 1)]
    }
    return [string, '']
}

let stage

export function initNodes() {

    const nodes = new PIXI.Graphics()
    stage = s.pixi.addChild(nodes)

    const nodeStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 5,
        fill: 'white',
        align: 'center',
    })

    s.nodes.forEach(node => {

        node.visibility = true

        // Circle

        node.gpxCircle = new PIXI.Graphics()
        node.gpxCircle.beginFill(0xFFFFFF)
        node.gpxCircle.drawCircle(0, 0, 1)
        node.gpxCircle.endFill()
        nodes.addChild(node.gpxCircle)

        // Label

        const [nA, nB] = splitInTwo(node.name)
        node.gpxText = new PIXI.Text(`${nA}\n${nB}`, nodeStyle)
        node.gpxText.scale.x = .5
        node.gpxText.scale.y = .5
        nodes.addChild(node.gpxText)

        // Interaction

        node.gpxCircle.interactive = true
        node.gpxCircle.hitArea = new PIXI.Circle(0, 0, 20)

        // Set information panel & set on circles

        node.gpxCircle.mouseover = mouseData => {
            mouseover(node)
            const exclude = s.nodes.filter(peer => !node.peers.includes(peer.id))
            exclude.forEach(node => node.visibility = false)
            
            drawNodes()
        }

        // Clean information panel & set off circles

        node.gpxCircle.mouseout = mouseData => {
            mouseout(node)
            s.nodes.forEach(node => node.visibility = true)
            drawNodes()
        }

    })

}

const infinity = new PIXI.Point(Infinity, Infinity)

export function drawNodes() {

    stage.clear()

    s.nodes.forEach(node => {
        const { x, y, gpxCircle, gpxText, visibility } = node
        const origin = new PIXI.Point(x, y)
        gpxCircle.position = origin
        gpxCircle.position = origin
        gpxText.position.set(x - gpxText.width / 2, y + 3)
        if (visibility) {
            gpxCircle.tint = 0xFFFFFF
            gpxText.tint = 0xFFFFFF
        }
        else {
            gpxCircle.tint = 0x666666
            gpxText.tint = 0x666666
        }

    })

}