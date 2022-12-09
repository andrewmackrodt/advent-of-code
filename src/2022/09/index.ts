import * as timers from 'timers'

type Direction = 'U' | 'R' | 'D' | 'L'
interface Coord { x: number; y: number }

function parseInput(input: string): [Direction, number][] {
    return input.replaceAll(/[ \t]+$/gm, '')
        .split('\n')
        .filter(line => Boolean(line.length))
        .map(line => ([line[0], parseInt(line.slice(1), 10)] as [Direction, number]))
}

function doStep(direction: Direction, coord: Coord): Coord {
    const newCoord = Object.assign({}, coord)
    switch (direction) {
        case 'U':
            newCoord.y++
            return newCoord
        case 'R':
            newCoord.x++
            return newCoord
        case 'D':
            newCoord.y--
            return newCoord
        case 'L':
            newCoord.x--
            return newCoord
        default:
            throw new Error(`Invalid direction: ${direction}`)
    }
}

export function partOne(input: string): number {
    const moves = parseInput(input)
    let head: Coord = { x: 0, y: 0 }
    let tail: Coord = { x: 0, y: 0 }
    const tailHistory: Coord[] = [tail]

    for (const [direction, count] of Object.values(moves)) {
        for (let i = 0; i < count; i++) {
            head = doStep(direction, head)
            let newTail = tail

            if (['L', 'R'].includes(direction)) {
                if ( ! (Math.abs(head.x - tail.x) > 1)) {
                    continue
                }

                newTail = doStep(direction, newTail)

                if (head.y !== tail.y) {
                    if (head.y > tail.y) newTail.y++
                    else newTail.y--
                }
            }
            else {
                if ( ! (Math.abs(head.y - tail.y) > 1)) {
                    continue
                }

                newTail = doStep(direction, newTail)

                if (head.x !== tail.x) {
                    if (head.x > tail.x) newTail.x++
                    else newTail.x--
                }
            }

            tail = newTail
            tailHistory.push(tail)
        }
    }

    return Object.keys(Object.values(tailHistory).reduce((res, coord) => {
        res[`${coord.x},${coord.y}`] = true
        return res
    }, {} as Record<string, true>)).length
}
