export function solve(input: string): number {
    const heightmap = input.split('\n').map(row => row.split('').map(cell => parseInt(cell, 10)))
    const lowest: number[] = []

    for (let y = 0; y < heightmap.length; y++) {
        const row = heightmap[y]
        for (let x = 0; x < row.length; x++) {
            const value = heightmap[y][x]
            const neighbours: number[] = []
            if (y > 0)                    neighbours.push(heightmap[y - 1][x]) // top
            if (x < row.length - 1)       neighbours.push(heightmap[y][x + 1]) // right
            if (y < heightmap.length - 1) neighbours.push(heightmap[y + 1][x]) // bottom
            if (x > 0)                    neighbours.push(heightmap[y][x - 1]) // left
            const higher = neighbours.filter(n => n > value)
            if (higher.length === neighbours.length) {
                lowest.push(value)
            }
        }
    }

    return lowest.reduce((res, cur) => res + cur + 1, 0)
}
