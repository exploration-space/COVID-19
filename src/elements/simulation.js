import * as reuse from 'd3-force-reuse'

import { drawContours } from './contours'
import { drawLinks } from './links'
import { drawNodes } from './nodes'
import { drawTokens } from './tokens'

export function simulation() {

    const simulation = d3.forceSimulation()
        .force('charge', reuse.forceManyBodyReuse()
            .strength(-20)
            .distanceMin(s.distance)
            .distanceMax(s.distance * 50)
            .update(
                function () {
                    var next = 1;
                    return function (i, nodes) {
                        var curr = Math.floor(4 * Math.log(i));
                        if (curr !== next) {
                            next = curr;
                            return true;
                        }
                        return false;
                    };
                }
            )
        )
        .force('collide', d3.forceCollide()
            .radius(s.distance)
            .strength(.5)
            .iterations(10)
        )
        .force('center', d3.forceCenter(0, 0))
        .force('link', d3.forceLink()
            .id(d => d.id)
            .strength(d => d.value)
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