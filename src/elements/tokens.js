import * as PIXI from 'pixi.js'
import * as WordCloud from 'wordcloud'

let stage, min, max
let links = []

const body = document.getElementsByTagName('body')[0]

const spriteSize = 20

const options = {
    gridSize: 10,
    weightFactor: .2,
    fontFamily: 'Arial, sans-serif',
    color: '#444',
    backgroundColor: 'transparent',
    rotateRatio: 0,
    // ellipticity: 2,
    // shape: 'diamond',
}

export function initTokens() {

    const tokens = new PIXI.Graphics()
    tokens.interactiveChildren = false
    stage = s.pixi.addChild(tokens)

    const gap = 2
    min = Math.pow(s.distance * 2 - gap, 2)
    max = Math.pow(s.distance * 2 + gap, 2)

    // Filter active tokens

    const limit = .01
    links = s.links.filter(l => l.value > limit)

    // Create PIXI.Cloud

    links.forEach((link, i) => {

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d');
        canvas.width = 100
        canvas.height = 100
        let list = Object.entries(link.tokens)

        options.list = list.slice(0, 7)
        WordCloud(canvas, options)

        canvas.addEventListener('wordcloudstop', obj => {
            const canvas = obj.path[0]
            let texture = PIXI.Texture.from(canvas)
            let sprite = new PIXI.Sprite(texture)
            sprite.width = spriteSize
            sprite.height = spriteSize
            sprite.x = Infinity
            sprite.y = Infinity
            link.tokens = sprite
            tokens.addChild(link.tokens)
        })

    })

}

export function drawTokens() {

    links.forEach(link => {

        const deltaX = Math.abs(link.source.x - link.target.x)
        const deltaY = Math.abs(link.source.y - link.target.y)
        const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
        const txt = link.txt

        if (min < distance && distance < max) {
            const x = deltaX / 2 + Math.min(link.source.x, link.target.x)
            const y = deltaY / 2 + Math.min(link.source.y, link.target.y)
            link.tokens.position = new PIXI.Point(x - spriteSize/2, y - spriteSize/2)
        } else {
            link.tokens.position = new PIXI.Point(Infinity, Infinity)
        }

    })

}