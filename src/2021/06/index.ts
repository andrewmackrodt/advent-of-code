export function solve(input: string, days = 80): number {
    const state = input.split(',').map(n => parseInt(n, 10))

    for (let d = 0; d < days; d++) {
        for (let i = 0, len = state.length; i < len; i++) {
            if (state[i] === 0) {
                state.push(8)
                state[i] = 6
            } else {
                state[i]--
            }
        }
    }

    return state.length
}
