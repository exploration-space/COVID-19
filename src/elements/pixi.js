import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

// this.WIDTH = 5000
// this.HEIGHT = 5000

export default () => {

    // Create and append PIXI

    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        transparent: true,
        resolution: 2,
        autoDensity: true,
        autoResize: true,
        resizeTo: window,
    })
    document.body.prepend(app.view)

    // Create and append viewport

    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        interaction: app.renderer.plugins.interaction
    })

    app.stage.addChild(viewport)

    s.pixi = viewport

    // Activate plugins

    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()
        .clampZoom({ minScale: .5, maxScale: 3 })
        .setTransform(
            (window.innerWidth - s.pixi.worldWidth) / 2,
            (window.innerHeight - s.pixi.worldHeight) / 2,
            .5, .5)

    // Prevent pinch gesture in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault();
    }, { passive: false });

}