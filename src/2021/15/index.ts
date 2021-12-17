const sum = (values: number[]) => values.reduce((sum, n) => sum + n, 0)

export function solve(input: string, multiply = 1): number {
    const cavern = input.split('\n').map(s => s.split('').map(c => parseInt(c, 10)))

    // extend right
    for (let y = 0, h = cavern.length; y < h; y++) {
        const width = cavern[y].length
        for (let i = 1; i < multiply; i++) {
            cavern[y] = [
                ...cavern[y],
                ...cavern[y].slice(0, width)
                    .map(n => n + i < 10 ? n + i : (n + i) % 9)]
        }
    }

    // extend down
    for (let i = 1, h = cavern.length; i < multiply; i++) {
        for (let y = 0; y < h; y++) {
            cavern.push(cavern[y].map(n => n + i < 10 ? n + i : (n + i) % 9))
        }
    }

    const width = cavern[0].length
    const height = cavern.length

    const visited: Record<string, number[]> = {}

    const traverse = (x = 0, y = 0): number[] => {
        const path = [cavern[y][x]]
        const key = `${x},${y}`
        if (key in visited) return [...path, ...visited[key]]
        const neighbours: [number, number][] = []
        if (x < width - 1) neighbours.push([x + 1, y])
        if (y < height - 1) neighbours.push([x, y + 1])
        if (neighbours.length === 0) return path
        const res = neighbours.map(n => traverse(n[0], n[1])).sort((a, b) => sum(a) - sum(b))[0]
        visited[key] = res
        return [...path, ...res]
    }

    const shortest = traverse()

    return sum(shortest.slice(1))
}

export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => solve(input, 5)
