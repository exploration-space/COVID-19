import * as reuse from 'd3-force-reuse'
// import * as d3 from 'd3'
import * as force3D from 'd3-force-3d'

import { drawContours } from './contours'
import { drawLinks } from './links'
import { drawNodes } from './nodes'
import { drawTokens } from './tokens'

import { SVG } from 'pixi-svg'


const cos = Math.cos
const sin = Math.sin
const atan2 = Math.atan2

const asin = (x) => {
    return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

const cartesian = (spherical) => {
    var lambda = spherical[0],
        phi = spherical[1],
        cosPhi = cos(phi);
    return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}

const spherical = (cartesian) => {
    return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
}

let RR


export function simulation() {

    const simulation = force3D.forceSimulation()
        .numDimensions(3)
        .nodes(s.nodes)
        .force("collide", d3.forceCollide()
            .radius(60))
        .force("charge", d3.forceManyBody()
            .strength(-20)
        )
        .force("link",
            d3.forceLink(s.links)
                .id(d => d.id)
                .strength(d => d.value * 1)
        )
        .force("center", d3.forceCenter())

        .force("surface", function (alpha) {
            const strength = 1
            const R0 = Math.sqrt(
                d3.median(s.nodes.map(d => d.x ** 2 + d.y ** 2 + d.z * 2))
            ),
                R = 15 * Math.sqrt(s.nodes.length); //Math.min(150, Math.max(90, R0));

            RR = R0

            for (const node of s.nodes) {
                if (node.fx) node.x = node.fx
                if (node.fy) node.y = node.fy
                if (node.fz) node.z = node.fz
                node.norm = Math.sqrt(node.x ** 2 + node.y ** 2 + node.z ** 2);

                if (!node.norm) node.norm = 1

                node.cartesian = [
                    node.x / node.norm,
                    node.y / node.norm,
                    node.z / node.norm
                ];

                node.spherical = spherical([
                    node.x / node.norm,
                    node.y / node.norm,
                    node.z / node.norm
                ]).map(d => (d * 180) / Math.PI)

                // forcibly move node towards the surface
                {
                    const f = (1 + R / node.norm) / (1 + 1);
                    node.x = node.x * f;
                    node.y = node.y * f;
                    node.z = node.z * f;
                }

                // constrain speed vector to the tangent plane
                {
                    const sp =
                        (node.vx * node.x + node.vy * node.y + node.vz * node.z) /
                        node.norm ** 2;
                    node.vx -= node.x * sp;
                    node.vy -= node.y * sp;
                    node.vz -= node.z * sp;
                }

                // console.log(node)
            }
        })
        .tick() // Not clear what is this
        .on('tick', ticked)

}

export function ticked() {

    // console.log('hey')

    // drawContours()
    drawLinks()
    // drawNodes()
    // drawTokens()


    // const projection = d3.geoMercator()
    // const path = d3.geoPath(projection)

    // function update(node, link, label, path, projection) {
    //     //projection.rotate([Date.now() / 100, -20]);

    //     let bug = 0;
    //     node.each(d => {
    //       if (isNaN(d.x)) bug = 1;
    //     });
    //     if (bug) return;

    //     link.attr("d", d =>
    //       path({
    //         type: "LineString",
    //         coordinates: [d.source.spherical, d.target.spherical]
    //       })
    //     );

    // node.attr("d", d => {
    //   d.radius = (d.norm / 150) * 10;
    //   var p = path.pointRadius(d.radius)({
    //     type: "Point",
    //     coordinates: d.spherical
    //   });
    //   if (!p && backface) {
    // s.nodes.forEach(node => {
    //     node.radius = (node.norm / 150) * 4
    //     const clip = projection.clipAngle()
    //     projection.clipAngle(179.99);
    //     const p = path.pointRadius(node.radius)({
    //         type: "Point",
    //         coordinates: node.spherical
    //     })
    //     projection.clipAngle(clip)

    //     let div = document.createElement('svg');
    //     div.innerHTML = `<path d='${p}' />`
    //     const svg = new SVG(div);

    //     s.pixi.addChild(svg)

    //     console.log(p)
    //     console.log(div)

    //     // Example
    //     // M477.96387673221784,249.8892818672256m0,13910.537730738572a13910.537730738572,13910.537730738572 0 1,1 0,-27821.075461477143a13910.537730738572,13910.537730738572 0 1,1 0,27821.075461477143z

    // })
    // d.radius = (d.norm / 150) * 4;
    // const clip = projection.clipAngle();
    // projection.clipAngle(179.99);
    // p = path.pointRadius(d.radius)({
    //     type: "Point",
    //     coordinates: d.spherical
    // });
    // projection.clipAngle(clip);
    //   }

    //       return p;
    //     });



}





