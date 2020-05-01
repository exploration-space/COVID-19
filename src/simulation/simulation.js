import * as d3 from 'd3'
import * as reuse from 'd3-force-reuse'
import { s } from '../settings'
// import ticked from './ticked'
import background from '../draw/background'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
// import tokens from '../draw/tokens'


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

    s.stage = app.stage

    const links = new PIXI.Graphics()
    app.stage.addChild(links)

    const contours = new PIXI.Graphics()
    app.stage.addChild(contours)

    //Nodes

    const nodeStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 6,
        fill: "white",
    })

    s.nodes.forEach(node => {
        node.circle = new PIXI.Graphics()
        node.circle.beginFill(0xFFFFFF)
        node.circle.drawCircle(0, 0, 1)
        app.stage.addChild(node.circle)
        // node.label = new PIXI.Text(node.name, nodeStyle)
        // app.stage.addChild(node.label)
    })

    // Tokens

    const tokenStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 24,
        fill: "white",
        align: 'center'
    })

    s.links.forEach(link => {
        // if (link.value < .1) return
        const [key, value] = Object.entries(link.tokens)[0]
        const scale = value * .0005
        link.gpu = new PIXI.Text(key, tokenStyle)
        link.gpu.scale.set(scale)
        app.stage.addChild(link.gpu)
    })

    // Ticked

    const ticked = () => {

        // Nodes

        s.nodes.forEach(node => {
            const { x, y, circle, label } = node
            circle.position = new PIXI.Point(x, y)
            // label.position.set(x, y)
        })

        // Links

        links.clear()
        links.alpha = 0.1

        s.links.forEach(link => {
            const { source, target, value } = link
            links.lineStyle(value, 0xFFFFFF)
            links.moveTo(source.x, source.y)
            links.lineTo(target.x, target.y)
        })

        // Tokens

        s.links.forEach(link => {

            if (!link.gpu) return

            const deltaX = Math.floor(Math.abs(link.source.x - link.target.x))
            const deltaY = Math.floor(Math.abs(link.source.y - link.target.y))
            const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
            const gpu = link.gpu

            if (s.ext.distance.min < distance && distance < s.ext.distance.max) {

                const x = Math.floor(deltaX / 2 + (link.source.x < link.target.x ? link.source.x : link.target.x))
                const y = Math.floor(deltaY / 2 + (link.source.y < link.target.y ? link.source.y : link.target.y))
                console.log()
                gpu.position.set(x - gpu.width / 2, y - gpu.height / 2)

            } else {
                gpu.position.set(-100, -100)
            }

        })

        // Contours

        contours.clear()
        contours.alpha = 1

        const extX = d3.extent(s.nodes, d => d.x)
        const extY = d3.extent(s.nodes, d => d.y)
        const width = extX[1] - extX[0]
        const height = extY[1] - extY[0]

        s.densityData = d3.contourDensity()
            .x(d => d.x)
            .y(d => d.y)
            .weight(d => d.relevancy)
            .size([width, height])
            .cellSize(5)
            .bandwidth(40)
            .thresholds(15)
            (s.nodes)




        // const extX = d3.extent(s.nodes, d => d.x)
        // const extY = d3.extent(s.nodes, d => d.y)
        // const width = extX[1] - extX[0]
        // const height = extY[1] - extY[0]
        // const x = extX[0]
        // const y = extY[0]

        // s.densityData = d3.contourDensity()
        //     .x(d => Math.floor(d.x) - x)
        //     .y(d => Math.floor(d.y) - y)
        //     // .weight(d => d.docs)
        //     .weight(d => d.relevancy)
        //     .size([width, height])
        //     .cellSize(5)
        //     .bandwidth(40)
        //     .thresholds(15)
        //     (s.nodes)


        // s.densityData.forEach(d => d.coordinates = d.coordinates
        //     .map(d => d.map(d => d.map(
        //         d => {
        //             return [d[0] + x, d[1] + y]
        //         }
        //     )))
        // )


        // const contourWidth = .8
        // const step = contourWidth / s.densityData.length
        // let count = 1


        for (let i = s.densityData.length - 1; i >= 0; i--) {

            contours.lineStyle(10, 0xFFFFFF)

            s.densityData[i].coordinates.forEach(array => {
                array.forEach(array => {
                    array.forEach(array => {
                        const [x, y] = array
                        contours.moveTo(x, y)
                        contours.lineTo(x, y)
                    })
                })
            })

            // links.
            // links.lineTo(target.x, target.y)

            // if (i = s.densityData.length) console.log(s.densityData)

            // s.context.beginPath()
            // s.context.strokeStyle = s.colors.contours
            // s.geoPath(s.densityData[i])
            // s.context.lineWidth = contourWidth - step * count
            // count = count + 1
            // s.context.stroke()

        }

    }



    // Simulation

    const simulation = d3.forceSimulation()
        .force('collide', d3.forceCollide()
            .radius(s.distance)
            .strength(.5)
            .iterations(20)
        )
        .force('center', d3.forceCenter(s.body.clientWidth / 2, s.body.clientHeight / 2))
        .force('link', d3.forceLink()
            .id(d => d.id)
            .strength(d => d.value * 1)
        )
        .nodes(s.nodes).on('tick', ticked)
        .force('link').links(s.links)

}