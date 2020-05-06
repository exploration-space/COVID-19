export default () => {

    const canvas = document.createElement('canvas')
    canvas.id = 'background'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const body = document.querySelector('body')
    body.prepend(canvas)

    const context = document.querySelector('#background').getContext('2d', { alpha: false })

    const gradient = context.createRadialGradient(
        canvas.width / 2, canvas.width / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2)

    gradient.addColorStop(1, s.colors.gradientA)
    gradient.addColorStop(0, s.colors.gradientB)

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

}