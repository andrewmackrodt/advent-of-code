interface Item {
    value: number
    moved: boolean
}

function parseInput(input: string): Item[] {
    return input.split('\n')
        .map(line => parseInt(line, 10))
        .filter(n => ! isNaN(n))
        .map(value => ({ value, moved: false }))
}

function parseSequence(input: string): number[] {
    let items = parseInput(input)
    for (let i = 0, len = items.length; i < len; i++) {
        const idx = items.findIndex(s => ! s.moved)
        const item = items[idx]
        item.moved = true
        if (item.value === 0) {
            continue
        }
        items.splice(idx, 1)
        let newIdx = (idx + item.value) % (len - 1)
        if (newIdx === 0) {
            newIdx = items.length
        }
        items = items.slice(0, newIdx).concat(item).concat(...items.slice(newIdx))
    }
    const sequence = items.map(s => s.value)
    const idx = sequence.findIndex(n => n === 0)
    return [0].concat(sequence.slice(idx + 1)).concat(sequence.slice(0, idx))
}

export function partOne(input: string): number {
    const sequence = parseSequence(input)
    const len = sequence.length
    return sequence[1000 % len] + sequence[2000 % len] + sequence[3000 % len]
}
