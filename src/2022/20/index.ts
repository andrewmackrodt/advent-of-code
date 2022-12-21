interface Item {
    value: number
    index: number
}

function parseInput(input: string): Item[] {
    return input.split('\n')
        .map(line => parseInt(line, 10))
        .filter(n => ! isNaN(n))
        .map((value, index) => ({ value, index }))
}

function parseSequence(input: string, rounds: number, multi: number): number[] {
    let items = parseInput(input)
    items.forEach(i => i.value *= multi)
    for (let r = 0; r < rounds; r++) {
        for (let i = 0, len = items.length; i < len; i++) {
            const idx = items.findIndex(s => s.index === i)
            const item = items[idx]
            if (item.value === 0) {
                continue
            }
            items.splice(idx, 1)
            const newIdx = (idx + item.value) % (len - 1)
            items = [...items.slice(0, newIdx), item, ...items.slice(newIdx)]
        }
    }
    const sequence = items.map(s => s.value)
    const idx = sequence.findIndex(n => n === 0)
    return [0, ...sequence.slice(idx + 1), ...sequence.slice(0, idx)]
}

function solve(input: string, rounds: number, multi: number) {
    const sequence = parseSequence(input, rounds, multi)
    const len = sequence.length
    return sequence[1000 % len] + sequence[2000 % len] + sequence[3000 % len]
}

export const partOne = (input: string) => solve(input, 1, 1)
export const partTwo = (input: string) => solve(input, 10, 811589153)
