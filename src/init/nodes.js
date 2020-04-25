export default () => {

    // Canvas for nodes

    const side = 20

    const canvas = document.createElement('canvas')
    canvas.width = side
    canvas.height = side

    const context = canvas.getContext('2d')
    context.fillStyle = s.colors.nodes
    context.font = '40px Arial'
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.fillText('●', side / 2, side / 2)

    s.drawNode = (x, y) => {
        s.context.drawImage(canvas, x - 1, y - 1, 2, 2)
    }

}