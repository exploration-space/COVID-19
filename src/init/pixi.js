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

}