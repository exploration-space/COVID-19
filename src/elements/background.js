
import * as PIXI from 'pixi.js'

export default () => {

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const gradient = context.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    )

    gradient.addColorStop(1, d3.rgb(0, 0, 0))
    gradient.addColorStop(0, d3.rgb(50, 50, 50))

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    let texture = PIXI.Texture.from(canvas)
    let sprite = new PIXI.Sprite(texture)
    sprite.width = window.innerWidth
    sprite.height = window.innerHeight
    sprite.position = new PIXI.Point(-window.innerWidth / 2, -window.innerHeight / 2)
    // link.tokens = sprite

    // const background = new PIXI.Graphics()
    const stage = s.pixi.addChild(sprite)

}