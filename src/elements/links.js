import * as PIXI from 'pixi.js'
import * as d3 from 'd3'
import { SVG } from 'pixi-svg'

let stage

export function initLinks() {

    const links = new PIXI.Graphics()
    stage = s.pixi.addChild(links)

}

const projection = d3.geoMercator()
const geoPath = d3.geoPath(projection)

export function drawLinks() {

    stage.removeChildren().forEach(child => child.destroy())

    console.log('hey')

    s.links.forEach(link => {


        const path = geoPath({
            type: "LineString",
            coordinates: [link.source.spherical, link.target.spherical]
        })

        let element = document.createElement('svg')
        element.style.width = '300'
        element.innerHTML = `<path stroke="black" stroke-width=".1" fill='none' d='${path}' />`
        const svg = new SVG(element)

        stage.addChild(svg)

    })

    // stage.alpha = .2

    // s.links.forEach(({ source, target, value }) => {
    //     stage.lineStyle(value, 0xCCCCCC)
    //     stage.moveTo(source.x, source.y)
    //     stage.lineTo(target.x, target.y)
    // })

}