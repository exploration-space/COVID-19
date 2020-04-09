import contours from './drawContours'
import keywords from './drawKeywords'
import nodes from './drawNodes'

export default () => {

    const x = s.zoomState.x * s.screen.density
    const y = s.zoomState.y * s.screen.density
    const k = s.zoomState.k


    
    s.screen.width = s.body.clientWidth * s.screen.density
    s.screen.height = s.body.clientHeight * s.screen.density

    s.context.scale(s.screen.density, s.screen.density)
    
    s.canvas
        .style('width', `${s.body.clientWidth}px`).style('height', `${s.body.clientHeight}px`)
        .attr('width', s.screen.width).attr('height', s.screen.height)

    s.backgroud
        .style('width', `${s.body.clientWidth}px`).style('height', `${s.body.clientHeight}px`)
        .attr('width', s.screen.width).attr('height', s.screen.height)

    s.gradient.addColorStop(1, s.colors.gradientA)
    s.gradient.addColorStop(0, s.colors.gradientB)

    s.bgContext.fillStyle = s.gradient
    s.bgContext.fillRect(0, 0, s.screen.width, s.screen.height)

    s.context.save()

    s.context.clearRect(0, 0, s.screen.width, s.screen.height)
    s.context.translate(x, y)
    s.context.scale(k, k)

    contours()
    // keywords()
    // nodes()


    s.context.restore()

}