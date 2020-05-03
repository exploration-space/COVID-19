import { s } from '../settings'
import * as PIXI from 'pixi.js'

let stage

export function initContours() {

    const contours = new PIXI.Graphics()
    stage = s.pixi.addChild(contours)

}

export function drawContours() {

    stage.clear()
    stage.alpha = .8

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
        stage.lineStyle(width, 0xFFFFFF)
        count = count + 1

        s.densityData[i].coordinates.forEach(array => {
            array.forEach(array => {
                array.forEach(([x, y], i) => {
                    if (i == 0) stage.moveTo(x, y)
                    stage.lineTo(x, y)
                })
            })
            stage.closePath()
        })

    }

}