import * as d3 from 'd3'
import * as reuse from 'd3-force-reuse'
import { s } from '../init/settings'

import { drawContours } from './contours'
import { drawLinks } from './links'
import { drawNodes } from './nodes'
import { drawTokens } from './tokens'

export function simulation() {

    const simulation = d3.forceSimulation()
        .force('collide', d3.forceCollide()
            .radius(s.distance)
            .strength(.5)
            .iterations(20)
        )
        .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
        .force('link', d3.forceLink()
            .id(d => d.id)
            .strength(d => d.value * 1)
        )
        .nodes(s.nodes).on('tick', ticked)
        .force('link').links(s.links)

}

export function ticked() {

    drawContours()
    // drawLinks()
    drawNodes()
    drawTokens()

}