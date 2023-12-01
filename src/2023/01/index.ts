type Pair = [number, number]

export function partOne(input: string): number {
    const lines = input.trim().replaceAll(/[ \t]+$/gm, '').split('\n')
    const pairs: Pair[] = []
    for (const line of lines) {
        const pair: Pair = [0, 0]
        for (let i = 0; i < line.length; i++) {
            if (line[i].match(/[0-9]/)) {
                const num = parseInt(line[i])
                if (pair[0] === 0) {
                    pair[0] = num
                }
                pair[1] = num
            }
        }
        pairs.push(pair)
    }
    return pairs
        .map(([a, b]) => parseInt(a.toString() + b.toString()))
        .reduce((sum, n) => sum + n, 0)
}
