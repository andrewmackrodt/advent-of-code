function parse(input: string): number[][] {
    return input.replaceAll(/[ \t]+/gm, '').split('\n')
        .filter(line => Boolean(line.length))
        .map(line => line.split('').map(c => parseInt(c, 10)))
}

enum Direction {
    Top = 'top',
    Right = 'right',
    Bottom = 'bottom',
    Left = 'left',
}

function getVisibleCount(grid: number[][], x: number, y: number, inwards: boolean, direction: Direction): number {
    const w = grid[0].length
    const h = grid.length
    let hasNext: () => boolean
    let ax = x, ay = y, count = 0

    if (inwards) {
        count++
    }

    if (direction === Direction.Top) hasNext = () => --ay >= 0
    else if (direction === Direction.Right) hasNext = () => ++ax < w
    else if (direction === Direction.Bottom) hasNext = () => ++ay < h
    else if (direction === Direction.Left) hasNext = () => --ax >= 0
    else throw new Error(`Invalid direction: ${direction}`)

    while (hasNext()) {
        if (grid[y][x] <= grid[ay][ax]) {
            return inwards ? 0 : count + 1
        }
        count++
    }

    return inwards ? count + 1 : count
}

function recurseGrid(input: string, allowEdges: boolean, cb: (grid: number[][], x: number, y: number) => void) {
    const grid = parse(input)
    let minY = 0, maxY = grid.length
    let minX = 0, maxX = grid[0].length

    if ( ! allowEdges) {
        minY++, maxY--
        minX++, maxX--
    }

    for (let y = minY ; y < maxY; y++)
    for (let x = minX ; x < maxX; x++) {
        cb(grid, x, y)
    }
}

export function partOne(input: string): number {
    let count = 0
    recurseGrid(input, true, (grid, x, y) => {
        if (getVisibleCount(grid, x, y, true, Direction.Top) ||
            getVisibleCount(grid, x, y, true, Direction.Right) ||
            getVisibleCount(grid, x, y, true, Direction.Bottom) ||
            getVisibleCount(grid, x, y, true, Direction.Left)
        ) {
            count++
        }
    })
    return count
}

export function partTwo(input: string): number {
    let maxScore = -1
    recurseGrid(input, false, (grid, x, y) => {
        const score = [
            getVisibleCount(grid, x, y, false, Direction.Top),
            getVisibleCount(grid, x, y, false, Direction.Right),
            getVisibleCount(grid, x, y, false, Direction.Bottom),
            getVisibleCount(grid, x, y, false, Direction.Left),
        ]
            .filter(count => Boolean(count))
            .reduce((total, count) => total * count, 1)
        if (score > maxScore) {
            maxScore = score
        }
    })
    return maxScore
}
