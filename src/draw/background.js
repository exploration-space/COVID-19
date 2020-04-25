export default () => {

    d3.select('#background')
        .style('width', `${s.body.clientWidth}px`)
        .style('height', `${s.body.clientHeight}px`)
        .attr('width', s.screen.width)
        .attr('height', s.screen.height)
    
    const context = document.querySelector('#background').getContext('2d', { alpha: false })
    
    const gradient = context.createRadialGradient(
        s.screen.width / 2, s.screen.height / 2, 0,
        s.screen.width / 2, s.screen.height / 2, s.screen.width / 2)

    gradient.addColorStop(1, s.colors.gradientA)
    gradient.addColorStop(0, s.colors.gradientB)

    context.fillStyle = gradient
    context.fillRect(0, 0, s.screen.width, s.screen.height)

}