export function solve(input: string): number {
    const totals = input.split('\n\n').filter(s => Boolean(s)).map(s => s.split('\n')
        .filter(s => s.length > 0)
        .map(s => parseInt(s))
        .reduce((total, n) => total + n, 0))

    return totals.sort((a, b) => b - a)[0]
}

export const partOne = (input: string) => solve(input)
