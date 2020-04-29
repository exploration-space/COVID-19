import * as d3 from 'd3'
import * as reuse from 'd3-force-reuse'
import { s } from '../settings'
// import ticked from './ticked'
import background from '../draw/background'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'


window.s = s
s.zoomState = d3.zoomIdentity

export default () => {

    // Pixi

    let stage = new PIXI.Container()
    let renderer = PIXI.autoDetectRenderer({
        width: s.body.clientWidth,
        height: s.body.clientHeight,
        antialias: true,
        backgroundColor: 0x000000,
        resolution: 2,
        autoDensity: true,
    })

    document.body.prepend(renderer.view)

    let links = new PIXI.Graphics()

    stage.addChild(links)

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

    s.nodes.forEach((node) => {
        node.gfx = new PIXI.Graphics()
        node.gfx.lineStyle(0)
        node.gfx.beginFill(0xFFFFFF)
        node.gfx.drawCircle(0, 0, 1)
        stage.addChild(node.gfx)


    })

    d3.select(renderer.view)
        .call(d3.drag()
            .container(renderer.view)
            .subject(() => {
                // console.log('test')
                simulation.find(d3.event.x, d3.event.y)
            }))
    // .on('start', dragstarted)
    // .on('drag', dragged)
    // .on('end', dragended)


    // Simulation

    simulation.nodes(s.nodes)
    simulation.force('link').links(s.links)

    simulation
        .nodes(s.nodes)
        .on('tick', ticked)

    simulation.force('link')
        .links(s.links)

    function ticked() {

        s.nodes.forEach((node) => {
            let { x, y, gfx } = node
            gfx.position = new PIXI.Point(x, y)
        })

        links.clear()
        links.alpha = 0.6

        s.links.forEach((link) => {
            let { source, target } = link
            links.lineStyle(Math.sqrt(link.value), 0x999999)
            links.moveTo(source.x, source.y)
            links.lineTo(target.x, target.y)
        })

        links.endFill()

        renderer.render(stage)

    }

    // Simulation start

    // const animation = true

    // if (animation) {
    //     simulation
    //         .on('tick', ticked)
    //         .on('end', () => {
    //             s.end = true
    //             ticked()
    //         })

    // } else {
    //     simulation.stop()
    //     simulation.tick(500)
    //     s.end = true
    // }

    // // Refresh on resize

    // window.onresize = function reportWindowSize() {
    //     background()
    //     ticked()
    // }

    // // Zoom

    // s.zoom = d3.zoom().on('zoom', () => {
    //     s.zoomState = d3.event.transform
    //     ticked()
    // })

    // s.zoom.scaleExtent(s.zoomExtent)
    // s.zoom.scaleTo(s.canvas, s.zoomExtent[0])

    // s.canvas.call(s.zoom)

}