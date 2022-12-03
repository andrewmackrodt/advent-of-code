// with leading space to avoid +1 so indexOf === priority
const priorities = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function solve(input: string): number {
    return input.split('\n')
        .map(s => [s.slice(0, s.length / 2), s.slice(s.length / 2)])
        .reduce((total, [c1, c2]) => {
            const conflicts = Object.values(c1).reduce((map, c) => {
                map[c] = false
                return map
            }, {} as Record<string, boolean>)

            Object.values(c2).forEach(c => {
                if (conflicts[c] === false) {
                    conflicts[c] = true
                    total += priorities.indexOf(c)
                }
            })

            return total
        }, 0)
}

export const partOne = (input: string) => solve(input)
