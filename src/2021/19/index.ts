interface Point3D {
    x: number
    y: number
    z: number
}

interface Distance3D<T extends Point3D = Point3D> {
    point: T
    distance: number
}

interface Beacon extends Point3D {
    key: string
}

interface Report {
    [key: string]: Beacon[]
}

function getDistance(p1: Point3D, p2: Point3D): number {
    const x = p2.x - p1.x
    const y = p2.y - p1.y
    const z = p2.z - p1.z

    return Math.sqrt((x * x) + (y * y) + (z * z))
}

function getNearest<T extends Point3D>(point: T, points: T[], count = 2): Distance3D<T>[] {
    const distances = points.filter(p => p.x !== point.x || p.y !== point.y || p.z !== point.z)
        .map(p => ({ point: p, distance: getDistance(point, p) }))
        .sort((a, b) => a.distance - b.distance)
    if (distances.length < count) throw new Error('not enough points')
    return distances.slice(0, count)
}

function parseInput(input: string): Report {
    const report: Report = {}
    for (const scannerReport of input.split('\n\n')) {
        const lines = scannerReport.split('\n')
        const index = parseInt(lines.shift()!.replace(/[^0-9]/g, ''), 10)
        if ( ! (index in report)) report[index] = []
        const points: Point3D[] = lines
            .map(s => s.split(',').map(s => parseInt(s, 10)))
            .map(a => ({ x: a[0], y: a[1], z: a[2] }))
        for (const point of points) {
            const hashCode = getNearest(point, points).reduce((total, dist) => total * dist.distance, 1)
            report[index].push({ ...point, key: hashCode.toFixed(5) })
        }
    }
    return report
}

export function solve(input: string): number {
    const report = parseInput(input)

    const unique = Object.values(report)
        .reduce((res, scannerBeacons) => {
            scannerBeacons.forEach(beacon => res.set(beacon.key, beacon))
            return res
        }, new Map<string, Beacon>())

    return unique.size
}

//region internal
export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => undefined
