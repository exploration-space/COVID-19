import { s } from '../settings'
import * as PIXI from 'pixi.js'

export default () => {

    // Nodes

    s.pixi.nodes.clear()
    s.pixi.nodes.alpha = .8

    s.nodes.forEach(node => {
        const { x, y, circle, label } = node
        circle.position = new PIXI.Point(x, y)
        // label.position.set(x, y)
    })

    // Links

    s.pixi.links.clear()
    s.pixi.links.alpha = .2

    s.links.forEach(({ source, target, value }) => {
        s.pixi.links.lineStyle(value, 0xFFFFFF)
        s.pixi.links.moveTo(source.x, source.y)
        s.pixi.links.lineTo(target.x, target.y)
    })

    // Tokens

    s.links.forEach(link => {

        if (!link.gpu) return

        const deltaX = Math.abs(link.source.x - link.target.x)
        const deltaY = Math.abs(link.source.y - link.target.y)
        const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
        const gpu = link.gpu

        if (s.ext.distance.min < distance && distance < s.ext.distance.max) {
            const x = deltaX / 2 + (link.source.x < link.target.x ? link.source.x : link.target.x)
            const y = deltaY / 2 + (link.source.y < link.target.y ? link.source.y : link.target.y)
            console.log()
            gpu.position.set(x - gpu.width / 2, y - gpu.height / 2)
        } else {
            gpu.position.set(-100, -100)
        }

    })

    // Contours

    s.pixi.contours.clear()
    s.pixi.contours.alpha = .8

    s.densityData = d3.contourDensity()
        .x(d => d.x)
        .y(d => d.y)
        .weight(d => d.relevancy)
        .size([s.body.clientWidth, s.body.clientHeight])
        .cellSize(5)
        .bandwidth(40)
        .thresholds(15)
        (s.nodes)

    const contourWidth = .8
    const step = contourWidth / s.densityData.length
    let count = 1

    for (let i = s.densityData.length - 1; i >= 0; i--) {

        const width = contourWidth - step * count
        s.pixi.contours.lineStyle(width, 0xFFFFFF)
        count = count + 1

        s.densityData[i].coordinates.forEach(array => {
            array.forEach(array => {
                array.forEach(([x, y], i) => {
                    if (i == 0) s.pixi.contours.moveTo(x, y)
                    s.pixi.contours.lineTo(x, y)
                })
            })
            s.pixi.contours.closePath()
        })

    }

}