import * as d3 from 'd3'
import * as reuse from 'd3-force-reuse'
import { s } from '../settings'
// import ticked from './ticked'
import background from '../draw/background'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import tokens from '../draw/tokens'


window.s = s
s.zoomState = d3.zoomIdentity

export default () => {

    // Pixi

    const app = new PIXI.Application({
        width: s.body.clientWidth,
        height: s.body.clientHeight,
        antialias: true,
        backgroundColor: 0x000000,
        resolution: 2,
        autoDensity: true,
        autoResize: true,
    })

    document.body.prepend(app.renderer.view)

    const links = new PIXI.Graphics()
    app.stage.addChild(links)

    const style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 6,
        fill: "white",
    })

    s.nodes.forEach(node => {
        node.circle = new PIXI.Graphics()
        node.circle.beginFill(0xFFFFFF)
        node.circle.drawCircle(0, 0, 1)
        app.stage.addChild(node.circle)
        node.label = new PIXI.Text(node.name, style)
        app.stage.addChild(node.label)
    })



    // Ticked

    const ticked = () => {

        s.nodes.forEach(node => {
            const { x, y, circle, label } = node
            circle.position = new PIXI.Point(x, y)
            label.position.set(x, y)
        })

        links.clear()
        links.alpha = 0.1

        s.links.forEach(link => {
            const { source, target, value } = link
            links.lineStyle(value, 0xFFFFFF)
            links.moveTo(source.x, source.y)
            links.lineTo(target.x, target.y)
        })

    }



    // Simulation

    const simulation = d3.forceSimulation()
        .force('collide', d3.forceCollide()
            .radius(s.distance)
            .strength(.5)
            .iterations(4)
        )
        .force('center', d3.forceCenter(s.body.clientWidth / 2, s.body.clientHeight / 2))
        .force('link', d3.forceLink()
            .id(d => d.id)
            .strength(d => d.value * .8)
        )
        .nodes(s.nodes).on('tick', ticked)
        .force('link').links(s.links)

}