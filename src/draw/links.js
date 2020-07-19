import * as PIXI from 'pixi.js'

export default () => {
    const links = new PIXI.Graphics()
    links.interactiveChildren = false
    links.alpha = .03
    const stage = s.pixi.addChild(links)

    s.links.forEach(({ source, target, value }) => {

        stage.lineStyle(value, 0xFFFFFF)
        stage.moveTo(source.x, source.y)
        stage.lineTo(target.x, target.y)

    })

}