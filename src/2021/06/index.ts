export function solve(input: string, days: number): number {
    const state = new Array(9).fill(0)

    input.split(',').map(s => {
        const timer = parseInt(s, 10)
        state[timer]++
    })

    for (let d = 0; d < days; d++) {
        const spawn = state.shift()
        state[6] += spawn
        state.push(spawn)
    }

    return state.reduce((res, cur) => res + cur)
}

export const partOne = (input: string) => solve(input, 80)
export const partTwo = (input: string) => solve(input, 256)
