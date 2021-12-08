export function solve(input: string, windowSize = 1): number {
    const depths = input.split('\n').filter(s => s.length > 0).map(s => parseInt(s))
    let previous = Number.MAX_SAFE_INTEGER
    let count = 0
    const window: number[] = []

    for (let i = window.length; i < depths.length; i++) {
        window.push(depths[i])
        const current = window.reduce((res, cur) => res + cur)

        if (current > previous) {
            count++
        }

        previous = current
        window.splice(0, 1)
    }

    return count
}
