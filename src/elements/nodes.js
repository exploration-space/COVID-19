import { s } from '../init/settings'
import * as PIXI from 'pixi.js'

let stage

export function initNodes() {

    const nodes = new PIXI.Graphics()
    stage = s.pixi.addChild(nodes)

    const nodeStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 6,
        fill: "white",
    })

    s.nodes.forEach(node => {
        node.gpx = new PIXI.Graphics()
        node.gpx.beginFill(0xFFFFFF)
        node.gpx.drawCircle(0, 0, 1)
        node.gpx.endFill()
        nodes.addChild(node.gpx)
        // node.txt = new PIXI.Text(node.name, nodeStyle)
        // nodes.addChild(node.txt)
    })

}

export function drawNodes() {

    stage.clear()
    stage.alpha = .8

    s.nodes.forEach(node => {
        const { x, y, gpx, txt } = node
        gpx.position = new PIXI.Point(x, y)
        // txt.position.set(x, y)
    })

}