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

        node.mouseover = {
            ethnicity: false,
            peers: false,
        }

        // Central Circle

        node.gpxCentral = new PIXI.Graphics()
        node.gpxCentral.beginFill(0xFFFFFF)
        node.gpxCentral.drawCircle(0, 0, 1)
        node.gpxCentral.endFill()
        nodes.addChild(node.gpxCentral)

        // Ethnicity Circle

        node.gpxEthnicity = new PIXI.Graphics()
        node.gpxEthnicity.lineStyle(.5, 0xFFFFFF)
        node.gpxEthnicity.drawCircle(0, 0, 3)
        node.gpxEthnicity.endFill()
        nodes.addChild(node.gpxEthnicity)

        // Peer Circle

        node.gpxPeer = new PIXI.Graphics()
        node.gpxPeer.lineStyle(.5, 0xFFFFFF)
        node.gpxPeer.drawCircle(0, 0, 5)
        node.gpxPeer.endFill()
        nodes.addChild(node.gpxPeer)

        // Label

        const [nA, nB] = splitInTwo(node.name)
        node.gpxText = new PIXI.Text(`${nA}\n${nB}`, nodeStyle)
        node.gpxText.scale.x = .5
        node.gpxText.scale.y = .5
        nodes.addChild(node.gpxText)

        // Interaction

        node.gpxCentral.interactive = true
        node.gpxCentral.hitArea = new PIXI.Circle(0, 0, 20)

        // Set information panel & set on circles

        node.gpxCentral.mouseover = mouseData => {
            mouseover(node)
            const peers = s.nodes.filter(peer => node.peers.includes(peer.id))
            peers.forEach(node => node.mouseover.peers = true )

            const ethnicities = s.nodes.filter(author => author.ethnicity == node.ethnicity)
            ethnicities.forEach(node => node.mouseover.ethnicity = true )

            drawNodes()
        }

        // Clean information panel & set off circles

        node.gpxCentral.mouseout = mouseData => {
            mouseout(node)
            s.nodes.forEach(node => node.mouseover.peers = false )
            s.nodes.forEach(node => node.mouseover.ethnicity = false )
        }

    })

}

const infinity = new PIXI.Point(Infinity, Infinity)

export function drawNodes() {

    stage.clear()

    s.nodes.forEach(node => {
        const { x, y, gpxCentral, gpxEthnicity, gpxPeer, gpxText } = node
        const origin = new PIXI.Point(x, y)
        gpxCentral.position = origin
        gpxEthnicity.position = (node.mouseover.ethnicity) ? origin : infinity
        gpxPeer.position = (node.mouseover.peers) ? origin : infinity
        gpxText.position.set(x - gpxText.width / 2, y + 3)
    })

}