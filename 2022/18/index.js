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
function createGrid(points) {
    const min = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER, z: Number.MAX_SAFE_INTEGER };
    const max = { x: 0, y: 0, z: 0 };
    for (const point of points) {
        if (point.x < min.x)
            min.x = point.x;
        if (point.y < min.y)
            min.y = point.y;
        if (point.z < min.z)
            min.z = point.z;
        if (point.x > max.x)
            max.x = point.x;
        if (point.y > max.y)
            max.y = point.y;
        if (point.z > max.z)
            max.z = point.z;
    }
    const grid = {};
    for (const point of points) {
        if (!(point.z in grid)) {
            grid[point.z] = {};
        }
        if (!(point.y in grid[point.z])) {
            grid[point.z][point.y] = {};
        }
        grid[point.z][point.y][point.x] = true;
    }
    return { grid, volume: { min, max } };
}
function getNeighbours(point, max) {
    const neighbours = [];
    if (point.z < max.z + 1)
        neighbours.push({ z: point.z + 1, y: point.y, x: point.x });
    if (point.y < max.y + 1)
        neighbours.push({ z: point.z, y: point.y + 1, x: point.x });
    if (point.x < max.x + 1)
        neighbours.push({ z: point.z, y: point.y, x: point.x + 1 });
    if (point.z > 0)
        neighbours.push({ z: point.z - 1, y: point.y, x: point.x });
    if (point.y > 0)
        neighbours.push({ z: point.z, y: point.y - 1, x: point.x });
    if (point.x > 0)
        neighbours.push({ z: point.z, y: point.y, x: point.x - 1 });
    return neighbours;
}
const toKey = (point) => `${point.x},${point.y},${point.z}`;
function getSurfaceCountReachableFromEdge(point, max, grid) {
    let points = getNeighbours(point, max);
    let visible = 6 - points.length;
    points = points.filter(n => !grid[n.z]?.[n.y]?.[n.x]);
    for (const point of points) {
        const visited = new Set();
        const queue = [point];
        while (queue.length > 0) {
            const point = queue.shift();
            const key = toKey(point);
            if (visited.has(key)) {
                continue;
            }
            visited.add(key);
            if (point.z === max.z + 1 ||
                point.y === max.y + 1 ||
                point.x === max.x + 1 ||
                point.z === 0 ||
                point.y === 0 ||
                point.x === 0) {
                visible++;
                break;
            }
            getNeighbours(point, max)
                .filter(n => !grid[n.z]?.[n.y]?.[n.x] && !visited.has(toKey(n)))
                .forEach(n => queue.push(n));
        }
    }
    return visible;
}
export function solve(input, limitReachableFromEdge) {
    const points = parseInput(input);
    const { grid, volume: { max } } = createGrid(points);
    const getVisibleEdgeCount = (point) => {
        if (limitReachableFromEdge) {
            return getSurfaceCountReachableFromEdge(point, max, grid);
        }
        else {
            return getNeighbours(point, max).filter(n => !grid[n.z]?.[n.y]?.[n.x]).length;
        }
    };
    return points.map(point => getVisibleEdgeCount(point)).reduce((total, count) => total + count, 0);
}
export const partOne = (input) => solve(input, false);
export const partTwo = (input) => solve(input, true);
