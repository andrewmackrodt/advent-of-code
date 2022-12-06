function detectStart(input: string, count: number): number {
    let sequence = input[0] + input.slice(0, count - 1)
    for (let i = count - 1, len = input.length; i < len; i++) {
        sequence = sequence.slice(1) + input[i]
        const unique = sequence.split('').reduce((res, c) => {
            res[c] = true
            return res
        }, {} as Record<string, boolean>)
        if (Object.values(unique).length === count) {
            return i + 1
        }
    }
    return -1
}

export function partOne(input: string): number {
    return detectStart(input.trim(), 4)
}
