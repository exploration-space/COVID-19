import { s } from './state'

export default () => {

    const middleSpace = string => {
        const middle = Math.round(string.length / 2)
        for (let i = middle, j = middle; i < string.length || j >= 0; i++, j--) {
            if (string[i] === ' ') return i
            if (string[j] === ' ') return j
        }
        return 0
    }

    // const fontSize = 1
    // const lineHeight = 2
    s.context.beginPath()
    s.context.fillStyle = s.colors.nodes


    s.nodes.forEach(node => {

        // s.context.font = `normal ${fontSize}pt Helvetica`
        // s.context.textAlign = 'center'

        const name = node.name,
            x = Math.floor(node.x),
            y = Math.floor(node.y)
        // const i = middleSpace(name)

        // const size = 1
        // const size = docs
        // const size = Math.log(docs)
        // const size = node.relevancy / 1000
        // s.context.font = `normal ${size}pt Helvetica`

        // s.context.fillText(name, x, y)

        // s.context.fillText(name.slice(0, i), x, y - lineHeight / 2)
        // s.context.fillText(name.slice(i + 1), x, y + lineHeight / 2)
        // s.context.fillText(`(${docs})`, x, y + lineHeight)

        s.context.beginPath()
        s.context.arc(x, y, .7, 0, 2 * Math.PI)

        s.context.fill()
    })


}