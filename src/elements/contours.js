import * as PIXI from 'pixi.js'

let stage

export function initContours() {

    const contours = new PIXI.Graphics()
    stage = s.pixi.addChild(contours)

}

export function drawContours() {

    stage.clear()
    stage.alpha = .8

    const density = d3.contourDensity()
        .x(d => d.x)
        .y(d => d.y)
        .weight(d => d.relevancy)
        .size([window.innerWidth, window.innerHeight])
        .cellSize(5)
        .bandwidth(40)
        .thresholds(15)
        (s.nodes)

    const contourWidth = .8
    const step = contourWidth / density.length
    let count = 1

    for (let i = density.length - 1; i >= 0; i--) {

        const width = contourWidth - step * count
        stage.lineStyle(width, 0xFFFFFF)
        count = count + 1

        density[i].coordinates.forEach(array => {
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