export function getRiskLevelOfLowPoints(input: string): number {
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

export function getLargestBasinsLengthMultiplied(input: string, size?: number | undefined): number {
    const heightmap = input.split('\n').map(row => row.split('').map(cell => parseInt(cell, 10)))
    const basins: number[][] = []

    const fillBasin = (basin: number[], x: number, y: number) => {
        const value = heightmap[y][x]
        if (value === 9) return basin
        basin.push(value)
        heightmap[y][x] = 9
        if (y > 0)                       fillBasin(basin, x, y - 1) // top
        if (x < heightmap[y].length - 1) fillBasin(basin, x + 1, y) // right
        if (y < heightmap.length - 1)    fillBasin(basin, x, y + 1) // bottom
        if (x > 0)                       fillBasin(basin, x - 1, y) // left
        return basin
    }

    for (let y = 0; y < heightmap.length; y++) {
        for (let x = 0; x < heightmap[y].length; x++) {
            const value = heightmap[y][x]
            if (value === 9) continue
            basins.push(fillBasin([], x, y))
        }
    }

    return basins.sort((a, b) => b.length - a.length)
        .slice(0, size)
        .reduce((total, b) => b.length * (total || 1), 0)
}

export const partOne = (input: string) => getRiskLevelOfLowPoints(input)
export const partTwo = (input: string) => getLargestBasinsLengthMultiplied(input, 3)
