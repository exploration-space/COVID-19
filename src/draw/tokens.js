import { s } from '../settings'

export default () => {

    s.links.forEach(link => {

        const deltaX = Math.floor(Math.abs(link.source.x - link.target.x))
        const deltaY = Math.floor(Math.abs(link.source.y - link.target.y))
        const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)

        if (s.ext.distance.min < distance && distance < s.ext.distance.max) {

            const x = Math.floor(deltaX / 2 + (link.source.x < link.target.x ? link.source.x : link.target.x))
            const y = Math.floor(deltaY / 2 + (link.source.y < link.target.y ? link.source.y : link.target.y))

            const token = Object.entries(link.tokens)[0]

            if (typeof s.tokens[token[0]] == 'function')
                s.tokens[token[0]](x, y, token[1])

        }

    })

}