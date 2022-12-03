// with leading space to avoid +1 so indexOf === priority
const priorities = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function getUnique(items: string): Record<string, number> {
    return Object.values(items).reduce((map, c) => {
        map[c] = priorities.indexOf(c)
        return map
    }, {} as Record<string, number>)
}

function filterSame(priorities: Record<string, number>, items: string): Record<string, number> {
    return Object.values(items).filter(c => c in priorities).reduce((res, c) => {
        res[c] = priorities[c]
        return res
    }, {} as Record<string, number>)
}

function sumCompartments(...compartments: string[]): number {
    let unique = getUnique(compartments[0])
    for (const compartment of compartments.slice(1)) {
        unique = filterSame(unique, compartment)
    }
    return Object.values(unique).reduce((total, v) => total + v, 0)
}

export function partOne(input: string): number {
    return input.split('\n')
        .map(s => [s.slice(0, s.length / 2), s.slice(s.length / 2)])
        .reduce((total, [c1, c2]) => total + sumCompartments(c1, c2), 0)
}

export function partTwo(input: string): number {
    const lines = input.split('\n').filter(s => Boolean(s.length))
    let total = 0
    let group: string[] = []
    for (let i = 0, len = lines.length; i < len; i++) {
        group.push(lines[i])
        if ((i + 1) % 3 === 0) {
            total += sumCompartments(...group)
            group = []
        }
    }
    return total
}
