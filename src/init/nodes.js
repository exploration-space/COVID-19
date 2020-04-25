export default () => {

    // Canvas for nodes

    const side = 20

    const nodeCanvas = document.createElement('canvas')
    nodeCanvas.width = side
    nodeCanvas.height = side

    const nodeContext = nodeCanvas.getContext('2d')
    nodeContext.fillStyle = s.colors.tokens
    nodeContext.font = '40px Arial'
    nodeContext.textBaseline = 'middle'
    nodeContext.textAlign = 'center'
    nodeContext.fillText('●', side / 2, side / 2)

    s.drawNode = (x, y) => {
        s.context.drawImage(nodeCanvas, x - 1, y - 1, 2, 2)
    }

}