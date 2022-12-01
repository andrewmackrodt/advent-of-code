enum Tile {
    EastSeaCucumber = '>',
    MovingEastSeaCucumber = '}',
    SouthSeaCucumber = 'v',
    MovingSouthSeaCucumber = 'V',
    Empty = '.',
    Transition = '!',
}

export function solve(input: string): number {
    const grid = input.split('\n').map(line => line.split('') as Tile[])

    const clearTransition = () => {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                switch (grid[y][x]) {
                    case Tile.MovingEastSeaCucumber:
                        grid[y][x] = Tile.EastSeaCucumber
                        break
                    case Tile.MovingSouthSeaCucumber:
                        grid[y][x] = Tile.SouthSeaCucumber
                        break
                    case Tile.Transition:
                        grid[y][x] = Tile.Empty
                        break
                }
            }
        }
    }

    const step = (): boolean => {
        let moveCount = 0

        // move east
        for (let y = 0; y < grid.length; y++) {
            for (let x = grid[y].length - 1; x >= 0; x--) {
                const x2 = x < grid[y].length - 1 ? x + 1 : 0
                if (grid[y][x] === Tile.EastSeaCucumber && grid[y][x2] === Tile.Empty) {
                    grid[y][x] = Tile.Transition
                    grid[y][x2] = Tile.MovingEastSeaCucumber
                    moveCount++
                }
            }
        }

        clearTransition()

        // move south
        for (let y = grid.length - 1; y >= 0; y--) {
            const y2 = y < grid.length - 1 ? y + 1 : 0
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === Tile.SouthSeaCucumber && grid[y2][x] === Tile.Empty) {
                    grid[y][x] = Tile.Transition
                    grid[y2][x] = Tile.MovingSouthSeaCucumber
                    moveCount++
                }
            }
        }

        clearTransition()

        return moveCount > 0
    }

    let stepCount = 1
    while (step()) stepCount++

    return stepCount
}

export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => undefined
