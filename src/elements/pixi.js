import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

export default () => {

    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        transparent: true,
        resolution: 2,
        autoDensity: true,
        autoResize: true,
    })

    document.body.prepend(app.view)

    s.pixi = app.stage

    // create viewport
    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        // worldWidth: 100,
        // worldHeight: 100,

        interaction: app.renderer.plugins.interaction
        // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    // add the viewport to the stage
    app.stage.addChild(viewport)

    s.pixi = viewport

    // activate plugins
    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()
        .clampZoom({ minScale: .5, maxScale:3 })
        // .snapZoom({width: 1000})


    // Prevent pinch gesture in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault();
    }, { passive: false });

}