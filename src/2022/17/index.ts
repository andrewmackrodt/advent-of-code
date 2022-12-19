interface Point {
    x: number
    y: number
}

interface Rock {
    w: number
    h: number
    position: Point[]
}

enum Tile {
    Air = '.',
    Rock = '#',
}

type Chamber = Tile[][]
type Direction = '<' | '>'

const rocks: Rock[] = [
    { w: 4, h: 1, position: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }] },
    { w: 3, h: 3, position: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }] },
    { w: 3, h: 3, position: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }] },
    { w: 1, h: 4, position: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }] },
    { w: 2, h: 2, position: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
]

const chamberWidth = 7
const rockStartX = 2
const rockStartY = 3

function expandChamber(chamber: Chamber, minHeight: number) {
    for (let y = chamber.length - 1; y >= 0 && minHeight > 0; y--) {
        if (chamber[y].find(tile => tile !== Tile.Air)) {
            break
        }
        minHeight--
    }
    for (let i = 0; i < minHeight; i++) {
        chamber.push(new Array(chamberWidth).fill(Tile.Air))
    }
}

function addRock(chamber: Chamber, rockIndex: number): Rock {
    const rock: Rock = {
        w: rocks[rockIndex].w,
        h: rocks[rockIndex].h,
        position: [],
    }

    const minHeight = rock.h + rockStartY
    expandChamber(chamber, minHeight)
    const top = chamber.length - 1

    for (let { x, y } of rocks[rockIndex].position) {
        x += rockStartX
        y = top - y
        rock.position.push({ x, y })
        chamber[y][x] = Tile.Air
    }

    return rock
}

function moveRock(chamber: Chamber, rock: Rock, direction: Direction): boolean {
    const dx = direction === '>' ? 1 : -1
    let canMoveHorizontal = true
    for (const { x, y } of rock.position) {
        const nx = dx + x
        if ( ! (0 <= nx && nx < chamberWidth && chamber[y][nx] === Tile.Air)) {
            canMoveHorizontal = false
            break
        }
    }
    if (canMoveHorizontal) {
        for (const point of rock.position) {
            point.x += dx
        }
    }
    let canMoveDown = true
    for (const { x, y } of rock.position) {
        const ny = y - 1
        if ( ! (0 <= ny && chamber[ny][x] === Tile.Air)) {
            canMoveDown = false
            break
        }
    }
    if (canMoveDown) {
        for (const point of rock.position) {
            point.y--
        }
        if ( ! chamber[chamber.length - 1].find(tile => tile !== Tile.Air)) {
            chamber.splice(chamber.length - 1)
        }
    }
    return canMoveDown
}

function solve(input: string, steps: number): number {
    const chamber: Chamber = []
    const directions = input.replaceAll(/[^<>]/g, '')
    let rockIndex = 0
    let directionIndex = 0
    for (let step = 0; step < steps; step++) {
        const rock = addRock(chamber, rockIndex++)
        if (rockIndex >= rocks.length) rockIndex = 0
        while (true) {
            const direction = directions[directionIndex++] as Direction
            if (directionIndex >= directions.length) directionIndex = 0
            if ( ! moveRock(chamber, rock, direction)) {
                for (const { x, y } of rock.position) {
                    chamber[y][x] = Tile.Rock
                }
                break
            }
        }
    }
    return chamber.length
}

export const partOne = (input: string) => solve(input, 2022)
