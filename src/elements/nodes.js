import { mouseover, mouseout } from '../interface/mouseover'
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

        // Circle

        node.gpx = new PIXI.Graphics()
        node.gpx.beginFill(0xFFFFFF)
        node.gpx.drawCircle(0, 0, 1)
        node.gpx.endFill()
        nodes.addChild(node.gpx)

        // Label

        const [nA, nB] = splitInTwo(node.name)
        node.txt = new PIXI.Text(`${nA}\n${nB}`, nodeStyle)
        node.txt.scale.x = .5
        node.txt.scale.y = .5
        nodes.addChild(node.txt)

        // Interaction

        node.gpx.interactive = true
        node.gpx.hitArea = new PIXI.Circle(0, 0, 20)
        node.gpx.mouseover = mouseData => mouseover(node)
        node.gpx.mouseout = mouseData => mouseout()

    })

}

export function drawNodes() {

    stage.clear()
    stage.alpha = .8

    s.nodes.forEach(node => {
        const { x, y, gpx, txt } = node
        gpx.position = new PIXI.Point(x, y)
        txt.position.set(x - txt.width / 2, y + 3)
    })

}