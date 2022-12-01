import { PriorityQueue } from '../../utils/PriorityQueue.js'

export function solve(input: string, multiplier = 1): number {
    const map = input.split('\n').map(s => s.split('').map(c => parseInt(c, 10)))

    // extend right
    for (let y = 0, h = map.length; y < h; y++) {
        const width = map[y].length
        for (let i = 1; i < multiplier; i++) {
            map[y] = [
                ...map[y],
                ...map[y].slice(0, width)
                    .map(n => n + i < 10 ? n + i : (n + i) % 9)]
        }
    }

    // extend down
    for (let i = 1, h = map.length; i < multiplier; i++) {
        for (let y = 0; y < h; y++) {
            map.push(map[y].map(n => n + i < 10 ? n + i : (n + i) % 9))
        }
    }

    const height = map.length
    const width  = map[0].length
    const start = `${0},${0}`
    const end = [width - 1, height - 1].join(',')
    const graph: Record<string, Record<string, number>> = {}

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const vertex = `${x},${y}`
            const neighbours = []
            if ( y > 0 )           neighbours.push([x, y - 1])
            if ( x < width - 1 )   neighbours.push([x + 1, y])
            if ( y < height - 1 )  neighbours.push([x, y + 1])
            if ( x > 0 )           neighbours.push([x - 1, y])
            graph[vertex] = {}
            neighbours.forEach(([x2, y2]) => graph[vertex][`${x2},${y2}`] = map[y2][x2])
        }
    }

    const risk: Record<string, number> = {}
    Object.keys(graph).forEach(xy => risk[xy] = Number.MAX_VALUE)
    risk[start] = 0

    const queue = new PriorityQueue<[string, number]>((a, b) => a[1] < b[1])
    queue.push([start, risk[start]])

    const visited = new Set()

    for (const [xy] of queue) {
        if (visited.has(xy)) {
            continue
        }

        visited.add(xy)

        for (const neighbour in graph[xy]) {
            if (risk[xy] + graph[xy][neighbour] < risk[neighbour]) {
                risk[neighbour] = risk[xy] + graph[xy][neighbour]
                queue.push([neighbour, risk[neighbour]])
            }
        }
    }

    return risk[end]
}

export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => solve(input, 5)
