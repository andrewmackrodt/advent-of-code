function getAdjacent(map, x, y) {
    const isCheckTop = y > 0;
    const isCheckBottom = y < map.length - 1;
    const isCheckRight = x < map[y].length - 1;
    const isCheckLeft = x > 0;
    const adjacent = [];
    if (isCheckTop) {
        adjacent.push([x, y - 1]);
        if (isCheckRight) {
            adjacent.push([x + 1, y - 1]);
        }
    }
    if (isCheckRight) {
        adjacent.push([x + 1, y]);
    }
    if (isCheckBottom) {
        if (isCheckRight)
            adjacent.push([x + 1, y + 1]);
        adjacent.push([x, y + 1]);
        if (isCheckLeft)
            adjacent.push([x - 1, y + 1]);
    }
    if (isCheckLeft) {
        adjacent.push([x - 1, y]);
        if (isCheckTop) {
            adjacent.push([x - 1, y - 1]);
        }
    }
    return adjacent;
}
function step(map) {
    let total = 0;
    const forEach = (cb) => {
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                cb(x, y);
            }
        }
    };
    const increment = (x, y) => {
        // return if already flashed this step
        if (map[y][x] > 9) {
            return;
        }
        // increment energy
        map[y][x]++;
        // flash if energy is greater than 9
        if (map[y][x] > 9) {
            // increment total
            total++;
            // increment adjacent peers
            for (const [ax, ay] of getAdjacent(map, x, y)) {
                increment(ax, ay);
            }
        }
    };
    forEach(increment);
    forEach((x, y) => {
        if (map[y][x] > 9) {
            map[y][x] = 0;
        }
    });
    return total;
}
export function getTotalFlashes(input, steps) {
    const map = input.split('\n').map(line => line.split('').map(char => parseInt(char, 10)));
    let flashes = 0;
    for (let i = 0; i < steps; i++) {
        flashes += step(map);
    }
    return flashes;
}
export function getStepFlashesSynchronized(input) {
    const map = input.split('\n').map(line => line.split('').map(char => parseInt(char, 10)));
    const mapSize = map.length * map[0].length;
    let i = 0;
    for (let isSync = false; !isSync; i++) {
        isSync = step(map) === mapSize;
    }
    return i;
}
export const partOne = (input) => getTotalFlashes(input, 100);
export const partTwo = (input) => getStepFlashesSynchronized(input);
