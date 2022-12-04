function parseInput(input: string): number[][][] {
    return input.split('\n')
        .filter(line => line.length)
        .map(line => (line.trim().split(',').map(arr => arr.split('-').map(s => parseInt(s)))))
}

export function partOne(input: string): number {
    return parseInput(input).filter(([l, r]) => r[0] <= l[0] && l[1] <= r[1] || l[0] <= r[0] && r[1] <= l[1]).length
}

export function partTwo(input: string): number {
    return parseInput(input).filter(([l, r]) => Math.max(l[0], r[0]) <= Math.min(l[1], r[1])).length
}
