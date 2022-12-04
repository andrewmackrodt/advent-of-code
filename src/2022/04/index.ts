export function partOne(input: string): number {
    return input.split('\n')
        .filter(line => line.length)
        .map(line => (line.trim().split(',').map(arr => arr.split('-').map(s => parseInt(s)))))
        .filter(([l, r]) => r[0] <= l[0] && l[1] <= r[1] || l[0] <= r[0] && r[1] <= l[1]).length
}
