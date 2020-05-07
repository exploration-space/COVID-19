export default () => {

    // Set extent for publications

    const years = s.nodes.map(node => Object.keys(node.years).map(Number)).flat()

    s.ext.years = {
        min: Math.min(...years),
        max: Math.max(...years),
    }

    // Prevent pinch gesture in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault();
    }, { passive: false });

}