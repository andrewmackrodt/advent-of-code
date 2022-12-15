const pointRegExp = new RegExp(/Sensor at x=(-?[0-9]+), ?y=(-?[0-9]+): closest beacon is at x=(-?[0-9]+), ?y=(-?[0-9]+)/i);
function parseInput(input) {
    const instruments = [];
    for (const line of input.split('\n').filter(line => Boolean(line.length))) {
        const match = pointRegExp.exec(line);
        if (!match)
            throw new Error('Input Error');
        const beacon = {
            type: 'beacon',
            x: parseInt(match[3], 10),
            y: parseInt(match[4], 10),
        };
        instruments.push({
            type: 'sensor',
            x: parseInt(match[1], 10),
            y: parseInt(match[2], 10),
            closestBeacon: beacon,
        }, beacon);
    }
    return instruments;
}
function getManhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function getNoBeaconXIntersectsAtY(sensors, y) {
    const intersections = [];
    for (const sensor of sensors) {
        const distance = getManhattanDistance(sensor, sensor.closestBeacon);
        const delta = distance - Math.abs(sensor.y - y);
        if (delta >= 0) {
            let min = sensor.x - delta;
            let max = sensor.x + delta;
            if (sensor.closestBeacon.y === y) {
                if (sensor.closestBeacon.x === min)
                    min++;
                else if (sensor.closestBeacon.x === max)
                    max--;
            }
            intersections.push([min, max]);
        }
    }
    return intersections;
}
function getUniqueIntersections(ranges) {
    const unique = [];
    const sorted = ranges.concat().sort((a, b) => a[0] - b[0]);
    let prev = sorted[0];
    unique.push(prev);
    for (let i = 1, len = sorted.length; i < len; i++) {
        const curr = sorted[i].concat();
        if (curr[0] <= prev[1]) {
            curr[0] = prev[1] + 1;
            if (curr[1] < curr[0]) {
                continue;
            }
        }
        unique.push(curr);
        prev = curr;
    }
    return unique;
}
function volume(range) {
    return 1 + Math.abs(range[1] - range[0]);
}
export function partOne(input, y = 2000000) {
    const instruments = parseInput(input);
    const sensors = instruments.filter(i => i.type === 'sensor');
    const intersections = getNoBeaconXIntersectsAtY(sensors, y);
    const unique = getUniqueIntersections(intersections);
    return unique.reduce((total, range) => total + volume(range), 0);
}
