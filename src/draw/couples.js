import * as PIXI from 'pixi.js'

let stage, max
let index = []

PIXI.BitmapFont.from('KeywordFont', {
    fontFamily: 'Arial',
    fontSize: 72,
    fill: 0xc7d1c2,
})

export default () => {

    const tokens = new PIXI.Graphics()
    tokens.interactiveChildren = false
    stage = s.pixi.addChild(tokens)

    max = Math.pow(s.distance * 3, 2)

    // Create PIXI.Text

    s.links.forEach(link => {

        const deltaX = Math.abs(link.source.x - link.target.x)
        const deltaY = Math.abs(link.source.y - link.target.y)
        const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)

        if (distance < max) {

            const [key, value] = Object.entries(link.tokens)[0]
            const scale = value * .003
            // const scale = .2
            const x = deltaX / 2 + Math.min(link.source.x, link.target.x)
            const y = deltaY / 2 + Math.min(link.source.y, link.target.y)

            link.txt = new PIXI.BitmapText(key, { fontName: 'KeywordFont' })

            link.txt.scale.set(scale)
            link.txt.position.set(x - link.txt.width / 2, y - link.txt.height / 2)

            // Check overlapping

            let overlapping = false

            for (var i = 0; i < index.length; i++) {

                if (index[i].index == link.index) continue

                const l1 = index[i].txt
                const l2 = link.txt

                if (!(l2.x > l1.x + l1.width
                    || l2.x + l2.width < l1.x
                    || l2.y > l1.y + l1.height
                    || l2.y + l2.height < l1.y)) {
                    overlapping = true
                    break
                }

            }

            if (!overlapping) {
                stage.addChild(link.txt)
                index.push(link)

                // draw a rounded rectangle
                // const graphics = new PIXI.Graphics();
                // graphics.lineStyle(2, 0xFF00FF, 1)
                // graphics.beginFill(0x650A5A, 0.25)
                // graphics.drawRoundedRect(link.txt.x, link.txt.y, link.txt.width, link.txt.height, 5)
                // graphics.endFill()
                // stage.addChild(graphics)
            }
        }

    })

}
