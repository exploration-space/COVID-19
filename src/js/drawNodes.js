import {
    s
} from './state'

const shift = 4

export default () => {

    const middleSpace = string => {
        const middle = Math.round(string.length / 2)
        for (let i = middle, j = middle; i < string.length || j >= 0; i++, j--) {
            if (string[i] === ' ') return i
            if (string[j] === ' ') return j
        }
        return 0
    }

    s.context.beginPath()
    s.context.fillStyle = s.colors.nodes
    s.context.font = s.style.fontNodes
    s.context.textAlign = 'center'

    s.nodes.forEach(node => {
        // console.log(node)
        const name = node.name,
            x = node.x,
            y = node.y
        s.context.fillText(name, x, y - shift)
        // // const i = middleSpace(name[0])
        // drawName(name.slice(0, i), name.slice(i + 1))
        // s.context.fillText(name[0].slice(0, i), x, y - shift / 2)
        // s.context.fillText(name[0].slice(i + 1), x, y + shift / 2)
    })

    // s.context.fill()

}