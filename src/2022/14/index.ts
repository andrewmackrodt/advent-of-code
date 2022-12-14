interface Point {
    x: number
    y: number
}

enum Tile {
    Rock = '#',
    Air = '.',
    Sand = 'o',
}

interface Cave {
    tiles: Tile[][]
    hole: Point
}

function parseInput(input: string): Cave {
    let minW = Number.MAX_SAFE_INTEGER, maxW = 0, maxH = 0
    const rockGroups = input.replace(/^\n+|\n+$/, '')
        .replaceAll(/\n{2,}/g, '\n')
        .split('\n')
        .map(line => line.split('->').map(vector => {
            const [x, y] = vector.split(',').map(str => parseInt(str, 10))
            if (x < minW) minW = x
            if (x > maxW) maxW = x
            if (y > maxH) maxH = y
            return { x, y } as Point
        }))
    const w = 1 + (maxW - minW), h = 1 + maxH
    const tiles: Tile[][] = new Array(h).fill(null).map(() => new Array(w).fill(Tile.Air))
    for (const rockGroup of rockGroups) {
        let prev = rockGroup[0]
        for (let i = 1, len = rockGroup.length; i < len; i++) {
            const curr = rockGroup[i]
            const [prevX, prevY] = [prev.x - minW, prev.y]
            const [currX, currY] = [curr.x - minW, curr.y]
            // horizontal
            if (prevX !== currX) {
                if (prevY !== currY) throw new Error('Logic Error')
                for (
                    let sx = Math.min(prevX, currX), ex = 1 + Math.max(prevX, currX);
                    sx < ex;
                    sx++
                ) {
                    tiles[prevY][sx] = Tile.Rock
                }
            }
            // vertical
            else if (prevY !== currY) {
                if (prevX !== currX) throw new Error('Logic Error')
                for (
                    let sy = Math.min(prevY, currY), ey = 1 + Math.max(prevY, currY);
                    sy < ey;
                    sy++
                ) {
                    tiles[sy][prevX] = Tile.Rock
                }
            }
            else {
                throw new Error('Logic Error')
            }
            prev = curr
        }
    }
    return {
        tiles,
        hole: {
            x: 500 - minW, y: 0,
        },
    }
}

export function solve(input: string, hasBounds: boolean): number {
    const { tiles, hole } = parseInput(input)
    if ( ! hasBounds) {
        hole.x += tiles.length
        tiles.forEach(row => {
            row.unshift(...new Array(tiles.length).fill(Tile.Air))
            row.push(...new Array(tiles.length).fill(Tile.Air))
        })
        tiles.push(new Array(tiles[0].length).fill(Tile.Air))
        tiles.push(new Array(tiles[0].length).fill(Tile.Rock))
    }
    let count = 0
    for (let prevCount = -1; prevCount !== count; prevCount++) {
        const sand: Point = Object.assign({}, hole)
        for (let isSettled = false; ! isSettled && sand.y < tiles.length - 1; ) {
            isSettled = true
            const ny = sand.y + 1
            // move down
            if (tiles[ny][sand.x] === Tile.Air) {
                sand.y++
                isSettled = false
                continue
            }
            // move left
            if (sand.x > 0) {
                if (tiles[ny][sand.x - 1] === Tile.Air) {
                    sand.x--
                    sand.y++
                    isSettled = false
                    continue
                }
            }
            // move right
            if (sand.x < tiles[ny].length - 1) {
                if (tiles[ny][sand.x + 1] === Tile.Air) {
                    sand.x++
                    sand.y++
                    isSettled = false
                }
            }
        }
        if (tiles[sand.y][sand.x] === Tile.Air) {
            const isLastRow = sand.y === tiles.length - 1
            const isHorizontalEnd = sand.x === 0 || sand.x === tiles[sand.y].length - 1
            const isFreeFall = hasBounds && (isLastRow || isHorizontalEnd)
            if ( ! isFreeFall) {
                tiles[sand.y][sand.x] = Tile.Sand
                count++
            }
        }
    }
    return count
}

export const partOne = (input: string) => solve(input, true)
export const partTwo = (input: string) => solve(input, false)
