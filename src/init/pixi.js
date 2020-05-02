import { s } from '../settings'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

export default () => {

    const app = new PIXI.Application({
        width: s.body.clientWidth,
        height: s.body.clientHeight,
        antialias: true,
        backgroundColor: 0x000000,
        resolution: 2,
        autoDensity: true,
        autoResize: true,
    })

    document.body.prepend(app.renderer.view)
    
    s.pixi = app.stage

    const nodes = new PIXI.Graphics()
    s.pixi.nodes = app.stage.addChild(nodes)

    const links = new PIXI.Graphics()
    s.pixi.links = app.stage.addChild(links)

    const contours = new PIXI.Graphics()
    s.pixi.contours = app.stage.addChild(contours)


    //Nodes

    const nodeStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 6,
        fill: "white",
    })

    s.nodes.forEach(node => {
        node.circle = new PIXI.Graphics()
        node.circle.beginFill(0xFFFFFF)
        node.circle.drawCircle(0, 0, 1)
        node.circle.endFill()
        nodes.addChild(node.circle)
        // node.label = new PIXI.Text(node.name, nodeStyle)
        // nodes.addChild(node.label)
    })

    // Tokens

    // Check this
    
    s.ext.distance = {
        min: Math.pow(s.distance * s.screen.density / 2, 2),
        max: Math.pow(s.distance * s.screen.density, 2)
    }

    const tokenStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 24,
        fill: "white",
        align: 'center'
    })

    s.links.forEach(link => {
        if (link.value < .1) return
        const [key, value] = Object.entries(link.tokens)[0]
        const scale = value * .0005
        link.gpu = new PIXI.Text(key, tokenStyle)
        link.gpu.scale.set(scale)
        app.stage.addChild(link.gpu)
    })

}