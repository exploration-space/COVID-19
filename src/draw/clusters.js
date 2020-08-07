import * as PIXI from 'pixi.js'

export default () => {



}

// function updateGroups() {
//     groupIds.forEach(function (groupId) {
//         var path = paths.filter(function (d) { return d == groupId; })
//             .attr('transform', 'scale(1) translate(0,0)')
//             .attr('d', function (d) {
//                 polygon = polygonGenerator(d);
//                 centroid = d3.polygonCentroid(polygon);
//                 return valueline(
//                     polygon.map(function (point) {
//                         return [point[0] - centroid[0], point[1] - centroid[1]];
//                     })
//                 );
//             });
//         d3.select(path.node().parentNode).attr('transform', 'translate(' + centroid[0] + ',' + (centroid[1]) + ') scale(' + scaleFactor + ')');
//     });
// }