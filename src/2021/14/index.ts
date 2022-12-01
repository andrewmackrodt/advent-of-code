interface PolymerInput {
    template: string
    rules: Record<string, string>
}

function parse(input: string): PolymerInput {
    const [template, rulesString] = input.split('\n\n')

    return {
        template,
        rules: rulesString.split('\n')
            .map(str => str.split(' -> '))
            .reduce((res, [pair, value]) => {
                res[pair] = value
                return res
            }, {} as Record<string, string>),
    }
}

export function solve(input: string, steps: number): number {
    const { template, rules } = parse(input)
    const countByLetter: Record<string, number> = {}
    let countByPair: Record<string, number> = {}

    for (const pair of Object.keys(rules).sort()) {
        countByPair[pair] = 0
        const [c1, c2] = pair.split('')
        countByLetter[c1] = 0
        countByLetter[c2] = 0
    }

    for (let i = 0; i < template.length - 1; i++) {
        const pair = template.substring(i, i + 2)
        countByPair[pair]++
        const [c1, c2] = pair.split('')
        if (i === 0) countByLetter[c1]++
        countByLetter[c2]++
    }

    for (let step = 0; step < steps; step++) {
        const newCountByPair = Object.assign({}, countByPair)
        for (const [pair, count] of Object.entries(countByPair)) {
            if (count === 0) continue
            const p1 = pair[0] + rules[pair]
            const p2 = rules[pair] + pair[1]
            newCountByPair[p1] += count
            newCountByPair[p2] += count
            newCountByPair[pair] -= count
            countByLetter[rules[pair]] += count
        }
        countByPair = newCountByPair
    }

    const counts = Object.values(countByLetter).sort((a, b) => a - b)
    const min = counts[0]
    const max = counts[counts.length - 1]
    return max - min
}

export const partOne = (input: string) => solve(input, 10)
export const partTwo = (input: string) => solve(input, 40)
