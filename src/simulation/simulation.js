import * as d3 from 'd3'
import * as reuse from 'd3-force-reuse'
import { s } from '../settings'
import ticked from './ticked'
import background from '../draw/background'

window.s = s
s.zoomState = d3.zoomIdentity

export default () => {

    // Simulation

    const simulation = d3.forceSimulation()
        .force('charge', reuse.forceManyBodyReuse()
            .strength(-5)
        .distanceMin(s.distance)
            .distanceMax(10000)
        )
        .force('collide', d3.forceCollide()
            .radius(s.distance)
            .strength(.3)
            .iterations(20)
        )
        .force('center', d3.forceCenter(s.screen.width / 2, s.screen.height / 2))
        .force('link', d3.forceLink()
            .id(d => d.id)
            .strength(d => d.value * .1)
            .iterations(20)
        )

    simulation.nodes(s.nodes)
    simulation.force('link').links(s.links)

    // Simulation start

    const animation = true

    if (animation) {
        simulation
            .on('tick', ticked)
            .on('end', () => {
                s.end = true
                ticked()
            })

    } else {
        simulation.stop()
        simulation.tick(500)
        s.end = true
    }

    // Refresh on resize

    window.onresize = function reportWindowSize() {
        background()
        ticked()
    }

    // Zoom

    s.zoom = d3.zoom().on('zoom', () => {
        s.zoomState = d3.event.transform
        ticked()
    })

    s.zoom.scaleExtent(s.zoomExtent)
    s.zoom.scaleTo(s.canvas, s.zoomExtent[0])

    s.canvas.call(s.zoom)

}