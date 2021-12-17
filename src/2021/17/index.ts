interface PointArea {
    x1: number
    x2: number
    y1: number
    y2: number
}

function factorial(n: number): number {
    return n > 1 ? n + factorial(n - 1) : n
}

export function solve(input: string): number {
    const targetArea: PointArea = input.replace(/ /g, '')
        .replace(/[^:]+:/, '')
        .split(',')
        .reduce((area, str) => {
            const [k, v1, v2] = str.split(/[=.]+/)
            area[`${k}1`] = parseInt(v1, 10)
            area[`${k}2`] = parseInt(v2, 10)
            return area
        }, {} as Record<string, number>) as any

    // when y1 === -10, highest y velocity === 45, i.e. 9!
    return factorial((targetArea.y1 * -1) - 1)
}
