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

export function partOne(input: string): number {
    const grid = parse(input)
    const w = grid[0].length
    const h = grid.length
    let count = (2 * (w - 2)) + (2 * h)

    const isVisible = (x: number, y: number, direction: Direction): boolean => {
        let hasNext: () => boolean
        let ax = x, ay = y

        if (direction === Direction.Top) hasNext = () => --ay >= 0
        else if (direction === Direction.Right) hasNext = () => ++ax < w
        else if (direction === Direction.Bottom) hasNext = () => ++ay < h
        else if (direction === Direction.Left) hasNext = () => --ax >= 0
        else throw new Error(`Invalid direction: ${direction}`)

        while (hasNext()) {
            if (grid[y][x] <= grid[ay][ax]) {
                return false
            }
        }

        return true
    }

    for (let y = 1, yLen = h - 1; y < yLen; y++)
    for (let x = 1, xLen = w - 1; x < xLen; x++) {
        if (isVisible(x, y, Direction.Top) ||
            isVisible(x, y, Direction.Right) ||
            isVisible(x, y, Direction.Bottom) ||
            isVisible(x, y, Direction.Left)
        ) {
            count++
        }
    }

    return count
}
