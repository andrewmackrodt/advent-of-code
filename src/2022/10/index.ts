type Instruction = ['noop'] | ['addx', number]

function parseInput(input: string): Instruction[] {
    return input.trim().replaceAll(/[ \t]+$/gm, '').split('\n')
        .filter(line => Boolean(line.length))
        .map(line => {
            const [instruction, value] = line.split(' ', 2)
            if (typeof value !== 'undefined') {
                return [instruction, parseInt(value, 10)] as Instruction
            } else {
                return [instruction] as Instruction
            }
        })
}

export function partOne(input: string): number {
    const watchCycles = [20, 60, 100, 140, 180, 220, Number.MAX_SAFE_INTEGER]
    let cycle = 0, x = 1, strength = 0
    for (const [instruction, value] of parseInput(input)) {
        cycle += instruction === 'noop' ? 1 : 2
        if (watchCycles[0] <= cycle) {
            strength += watchCycles[0] * x
            watchCycles.shift()
        }
        if (instruction !== 'noop') {
            x += value
        }
    }
    return strength
}
