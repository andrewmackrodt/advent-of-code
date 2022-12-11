function getDistance(p1, p2) {
    const x = p2.x - p1.x;
    const y = p2.y - p1.y;
    const z = p2.z - p1.z;
    return Math.sqrt((x * x) + (y * y) + (z * z));
}
function getNearest(point, points, count = 2) {
    const distances = points.filter(p => p.x !== point.x || p.y !== point.y || p.z !== point.z)
        .map(p => ({ point: p, distance: getDistance(point, p) }))
        .sort((a, b) => a.distance - b.distance);
    if (distances.length < count)
        throw new Error('not enough points');
    return distances.slice(0, count);
}
function parseInput(input) {
    const report = [];
    for (const scannerReport of input.split('\n\n')) {
        const lines = scannerReport.split('\n');
        const index = parseInt(lines.shift().replace(/[^0-9]/g, ''), 10);
        if (!(index in report))
            report[index] = [];
        const points = lines
            .map(s => s.split(',').map(s => parseInt(s, 10)))
            .map(a => ({ x: a[0], y: a[1], z: a[2] }));
        for (const point of points) {
            const hashCode = getNearest(point, points).reduce((total, dist) => total * dist.distance, 1);
            report[index].push({ ...point, hashCode: hashCode.toFixed(5) });
        }
    }
    return report;
}
// https://github.com/artesea/advent-of-code/blob/940cfe75eea2be15eecd89290b12ee1af0d3a779/2021/19a.php#L149
function getRotations({ x, y, z }) {
    return [
        [x, y, z],
        [x, z, -y],
        [x, -y, -z],
        [x, -z, y],
        [-x, -y, z],
        [-x, -z, -y],
        [-x, y, -z],
        [-x, z, y],
        [y, -x, z],
        [y, z, x],
        [y, x, -z],
        [y, -z, -x],
        [-y, x, z],
        [-y, -z, x],
        [-y, -x, -z],
        [-y, z, -x],
        [z, y, -x],
        [z, x, y],
        [z, -y, x],
        [z, -x, -y],
        [-z, -y, -x],
        [-z, -x, y],
        [-z, y, x],
        [-z, x, -y],
    ]
        .map(([x, y, z]) => ({ x, y, z }));
}
function isSimilarPoints(a, b, c, d) {
    return (a.x < b.x) === (c.x < d.x) &&
        (a.y < b.y) === (c.y < d.y) &&
        (a.z < b.z) === (c.z < d.z);
}
export function mergeScannerReports(input) {
    const key = (point) => `${point.x},${point.y},${point.z}`;
    const report = parseInput(input);
    let hashCodeLookup = new Map();
    const unique = new Map();
    const updateHashes = () => {
        const beacons = [...unique.values()];
        hashCodeLookup = beacons.reduce((map, b) => {
            b.hashCode = getNearest(b, beacons)
                .reduce((total, dist) => total * dist.distance, 1)
                .toFixed(5);
            return map.set(b.hashCode, b);
        }, new Map());
    };
    report.shift()?.forEach(b => {
        hashCodeLookup.set(b.hashCode, b);
        unique.set(key(b), b);
    });
    const scanners = [{ x: 0, y: 0, z: 0 }];
    const getOverlappingByKey = (beacons) => (beacons.reduce((res, b) => {
        const base = hashCodeLookup.get(b.hashCode);
        if (base)
            res.push([base, b]);
        return res;
    }, []));
    const getOverlapping = (beacons) => beacons.filter(a => unique.has(key(a)));
    for (let i = 0; i < report.length;) {
        const beacons = report[i];
        const matchingKeys = getOverlappingByKey(beacons);
        let isAligned = false;
        for (const [base, unaligned] of matchingKeys) {
            const bn = getNearest(base, matchingKeys.map(o => o[0]));
            const un = getNearest(unaligned, matchingKeys.map(o => o[1]));
            const ur0 = getRotations(un[0].point);
            const ur1 = getRotations(un[1].point);
            const rotations = getRotations(unaligned).filter((r, i) => (isSimilarPoints(bn[0].point, base, ur0[i], r) &&
                isSimilarPoints(bn[1].point, base, ur1[i], r)));
            if (rotations.length !== 1 ||
                Math.abs(rotations[0].x) === Math.abs(rotations[0].y) ||
                Math.abs(rotations[0].x) === Math.abs(rotations[0].z) ||
                Math.abs(rotations[0].y) === Math.abs(rotations[0].z)) {
                continue;
            }
            const rotation = rotations[0];
            const ordered = [unaligned.x, unaligned.y, unaligned.z];
            let rx = 0, rxi = 1;
            let ry = 1, ryi = 1;
            let rz = 2, rzi = 1;
            if (Math.abs(rotation.x) - Math.abs(ordered[rx]) !== 0) {
                const temp = rx;
                if (Math.abs(rotation.x) - Math.abs(ordered[ry]) === 0) {
                    rx = ry;
                    ry = temp;
                }
                else {
                    rx = rz;
                    rz = temp;
                }
            }
            if (Math.abs(rotation.y) - Math.abs(ordered[ry]) !== 0) {
                const temp = ry;
                ry = rz;
                rz = temp;
            }
            if (rotation.x !== ordered[rx])
                rxi = -1;
            if (rotation.y !== ordered[ry])
                ryi = -1;
            if (rotation.z !== ordered[rz])
                rzi = -1;
            const rotate = (point) => {
                const vector = [point.x, point.y, point.z];
                return {
                    ...point,
                    x: vector[rx] * rxi,
                    y: vector[ry] * ryi,
                    z: vector[rz] * rzi,
                };
            };
            const scanner = {
                x: base.x - rotation.x,
                y: base.y - rotation.y,
                z: base.z - rotation.z,
            };
            const transform = (point) => {
                const rotated = rotate(point);
                return {
                    ...point,
                    x: rotated.x + scanner.x,
                    y: rotated.y + scanner.y,
                    z: rotated.z + scanner.z,
                };
            };
            const transformed = beacons.map(b => transform(b));
            const overlapping = getOverlapping(transformed);
            if (overlapping.length >= 12) {
                transformed.forEach(b => unique.set(key(b), b));
                updateHashes();
                scanners.push(scanner);
                report.splice(i, 1);
                i = 0;
                isAligned = true;
                break;
            }
        }
        if (!isAligned)
            i++;
    }
    if (report.length > 0)
        throw new Error('unable to map all scanners');
    return [[...unique.values()], scanners];
}
export function countBeacons(input) {
    return mergeScannerReports(input)[0].length;
}
export function getLargestManhattanDistance(input) {
    const scanners = mergeScannerReports(input)[1];
    let max = 0;
    for (let i = 0; i < scanners.length - 1; i++)
        for (let j = i + 1; j < scanners.length; j++) {
            const a = scanners[i];
            const b = scanners[j];
            const d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
            max = Math.max(max, d);
        }
    return max;
}
export const partOne = (input) => countBeacons(input);
export const partTwo = (input) => getLargestManhattanDistance(input);
