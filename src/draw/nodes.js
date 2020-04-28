export default () => {

    s.nodes.forEach(node => {

        if (s.node && (s.node.peers.includes(node.id) || node.id == s.node.id)) {
            s.drawRedNode(Math.floor(node.x), Math.floor(node.y))
        } else {
            s.drawWhiteNode(Math.floor(node.x), Math.floor(node.y))
        }

    })

}