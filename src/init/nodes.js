export default () => {

    // White node

    const side = 20

    const whiteCanvas = document.createElement('canvas')
    whiteCanvas.width = side
    whiteCanvas.height = side

    const whiteContext = whiteCanvas.getContext('2d')
    whiteContext.fillStyle = s.colors.nodes
    whiteContext.font = '40px Arial'
    whiteContext.textBaseline = 'middle'
    whiteContext.textAlign = 'center'
    whiteContext.fillText('●', side / 2, side / 2)

    s.drawWhiteNode = (x, y) => {
        s.context.drawImage(whiteCanvas, x - 1, y - 1, 2, 2)
    }

    // Red node

    const redCanvas = document.createElement('canvas')
    redCanvas.width = side
    redCanvas.height = side

    const redContext = redCanvas.getContext('2d')
    redContext.fillStyle = 'red'
    redContext.font = '40px Arial'
    redContext.textBaseline = 'middle'
    redContext.textAlign = 'center'
    redContext.fillText('●', side / 2, side / 2)

    s.drawRedNode = (x, y) => {
        s.context.drawImage(redCanvas, x - 1, y - 1, 2, 2)
    }

    



}