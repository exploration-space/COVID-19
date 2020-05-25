import * as PIXI from 'pixi.js'
import autoComplete from '@tarekraafat/autocomplete.js'

export default () => {

    // Listner
    document.querySelector("#autoComplete").addEventListener("autoComplete", event => {
        console.log(event)
    })

    const placeholder = 'Search'

    // The autoComplete.js Engine instance creator

    const autoCompletejs = new autoComplete({
        data: {
            src: async () => {
                return s.nodes
            },
            key: ["name"],
            // key: ["food", "cities", "animals"],
            cache: false
        },
        sort: (a, b) => {
            if (a.match < b.match) return -1
            if (a.match > b.match) return 1
            return 0
        },
        placeHolder: placeholder,
        selector: "#autoComplete",
        threshold: 0,
        debounce: 0,
        // searchEngine: "strict",
        searchEngine: "loose",
        highlight: true,
        maxResults: 10,
        resultsList: {
            render: true,
            container: source => {
                source.setAttribute("id", "autoComplete_list")
            },
            destination: document.querySelector("#autoComplete"),
            position: "afterend",
            element: "ul"
        },
        resultItem: {
            content: (data, source) => {
                source.innerHTML = data.match
            },
            element: "li"
        },
        noResults: () => {
            const result = document.createElement("li")
            result.setAttribute("class", "no_result")
            result.setAttribute("tabindex", "1")
            result.innerHTML = "No Results"
            document.querySelector("#autoComplete_list").appendChild(result)
        },
        onSelection: feedback => {

            console.log(feedback)

            const key = feedback.selection.key
            const node = feedback.selection.value
            const { x, y, name } = node

            document.querySelector("#autoComplete").value = name

            const scale = 5

            const position = new PIXI.Point(x, y)
            const origin = new PIXI.Point(0, 0)
            const duration = 1000

            const zoomout = () => s.pixi.snapZoom({
                width: 1000,
                height: 1000,
                time: duration,
                center: origin,
                ease: 'easeInOutSine',
                forceStart: true,
                removeOnComplete: true
            })

            const zoomin = () => s.pixi.snapZoom({
                width: 100,
                height: 100,
                time: duration,
                center: position,
                ease: 'easeInOutSine',
                forceStart: true,
                removeOnComplete: true
            })

            if (s.pixi.scale.x < 1) {
                console.log('in')
                zoomin()
            } else {
                console.log('out')
                zoomout()
                setTimeout(zoomin(), duration)
            }

        }
    })

}