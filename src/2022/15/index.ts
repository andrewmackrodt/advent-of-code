interface Point {
    x: number
    y: number
}

interface Beacon extends Point {
    type: 'beacon'
}

interface Sensor extends Point {
    type: 'sensor'
    closestBeacon: Beacon
}

type Instrument = Beacon | Sensor

type Range = [number, number]

const pointRegExp = new RegExp(/Sensor at x=(-?[0-9]+), ?y=(-?[0-9]+): closest beacon is at x=(-?[0-9]+), ?y=(-?[0-9]+)/i)

function getSensors(input: string): Sensor[] {
    const sensors: Sensor[] = []
    for (const line of input.split('\n').filter(line => Boolean(line.length))) {
        const match = pointRegExp.exec(line)
        if ( ! match) throw new Error('Input Error')
        sensors.push({
            type: 'sensor',
            x: parseInt(match[1], 10),
            y: parseInt(match[2], 10),
            closestBeacon: {
                type: 'beacon',
                x: parseInt(match[3], 10),
                y: parseInt(match[4], 10),
            },
        })
    }
    return sensors.sort((a, b) => a.y - b.y) as Sensor[]
}

function getManhattanDistance(a: Point, b: Point) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function getXIntersectsAtY(sensors: Sensor[], y: number, options?: { includeClosestBeacon: boolean }) {
    const intersections: Range[] = []
    for (const sensor of sensors) {
        const distance = getManhattanDistance(sensor, sensor.closestBeacon)
        const delta = distance - Math.abs(sensor.y - y)
        if (delta >= 0) {
            let min = sensor.x - delta
            let max = sensor.x + delta
            if ( ! options?.includeClosestBeacon && sensor.closestBeacon.y === y) {
                if (sensor.closestBeacon.x === min) min++
                else if (sensor.closestBeacon.x === max) max--
            }
            intersections.push([min, max])
        }
    }
    return intersections
}

function getUniqueIntersections(ranges: Range[]): Range[] {
    const unique: Range[] = []
    const sorted = ranges.concat().sort((a, b) => a[0] - b[0])
    let prev = sorted[0]
    unique.push(prev)
    for (let i = 1, len = sorted.length; i < len; i++) {
        const curr = sorted[i].concat() as Range
        if (curr[0] - 1 <= prev[1]) {
            if (prev[1] < curr[1]) {
                prev[1] = curr[1]
            }
            continue
        }
        unique.push(curr)
        prev = curr
    }
    return unique
}

function volume(range: Range) {
    return 1 + Math.abs(range[1] - range[0])
}

export function partOne(input: string, y?: number): number {
    const sensors = getSensors(input)
    if ( ! y) y = sensors[sensors.length - 1].y < 1000 ? 10 : 2000000
    const intersections = getXIntersectsAtY(sensors, y)
    const unique = getUniqueIntersections(intersections)
    return unique.reduce((total, range) => total + volume(range), 0)
}

export function partTwo(input: string, max?: number): number {
    const sensors = getSensors(input)
    if ( ! max) max = sensors[sensors.length - 1].y < 1000 ? 20 : 4000000
    for (let y = 0; y < max; y++) {
        const intersections = getXIntersectsAtY(sensors, y, { includeClosestBeacon: true })
        const unique = getUniqueIntersections(intersections)
        for (let i = 1, len = unique.length; i < len; i++) {
            const prev = unique[i - 1][1]
            const curr = unique[i][0]
            if (curr - prev === 2) {
                const x = prev + 1
                if (0 <= x && x <= max) {
                    return (x * 4000000) + y
                }
            }
        }
    }
    return -1
}
