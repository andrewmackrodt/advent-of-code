function parseInput(input) {
    return input.split('\n')
        .map(line => line.split(',').map(n => parseInt(n, 10)))
        .reduce((points, split) => {
        if (split.length === 3 && split.filter(n => !isNaN(n))) {
            points.push({ x: split[0], y: split[1], z: split[2] });
        }
        return points;
    }, []);
}
export function partOne(input) {
    const points = parseInput(input);
    let sides = points.length * 6;
    for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = 0; j < points.length; j++) {
            if (j === i) {
                continue;
            }
            const b = points[j];
            if (Math.abs(a.x - b.x) +
                Math.abs(a.y - b.y) +
                Math.abs(a.z - b.z) === 1) {
                sides--;
            }
        }
    }
    return sides;
}
