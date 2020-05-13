import * as PIXI from 'pixi.js'

let stage, min, max

export function initTokens() {

    const tokens = new PIXI.Graphics()
    stage = s.pixi.addChild(tokens)

    const gap = 2
    min = Math.pow(s.distance * 2 - gap, 2)
    max = Math.pow(s.distance * 2 + gap, 2)

    const tokenStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0x555555,
        align: 'center'
    })

    s.links.forEach(link => {
        if (link.value < .1) return
        const [key, value] = Object.entries(link.tokens)[0]
        const scale = value * .0007
        link.txt = new PIXI.Text(key, tokenStyle)
        link.txt.scale.set(scale)
        stage.addChild(link.txt)
    })

}

export function drawTokens() {

    s.links.forEach(link => {

        if (!link.txt) return

        const deltaX = Math.abs(link.source.x - link.target.x)
        const deltaY = Math.abs(link.source.y - link.target.y)
        const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
        const txt = link.txt

        if (min < distance && distance < max) {
            const x = deltaX / 2 + Math.min(link.source.x, link.target.x)
            const y = deltaY / 2 + Math.min(link.source.y, link.target.y)
            txt.position.set(x - txt.width / 2, y - txt.height / 2)
        } else {
            txt.position.set(Infinity, Infinity)
        }

    })

}