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

function step(template: string, rules: Record<string, string>): string {
    const polymer = template.split('')
    for (let i = 0; i < polymer.length - 1; i++) {
        const pair = polymer.slice(i, i + 2).join('')
        const insertion = rules[pair]
        if (typeof insertion === 'undefined') continue
        polymer.splice(i + 1, 0, insertion)
        i++
    }
    return polymer.join('')
}

function getCountByLetter(text: string): Record<string, number> {
    const res: Record<string, number> = {}
    for (const c of text) {
        if ( ! (c in res)) {
            res[c] = 0
        }
        res[c]++
    }
    return res
}

export function solve(input: string, steps: number): number {
    const { template, rules } = parse(input)
    let polymer = template
    for (let i = 0; i < steps; i++) {
        polymer = step(polymer, rules)
    }
    const countByLetter = getCountByLetter(polymer)
    const counts = Object.values(countByLetter).sort((a, b) => a - b)
    const min = counts[0]
    const max = counts[counts.length - 1]
    return max - min
}
