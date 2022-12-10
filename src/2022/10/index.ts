import { asciiToText } from '../../utils/ascii.js'

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

export function partTwo(input: string): string {
    const w = 40, h = 6
    const display: ('.' | '#')[] = new Array(w * h).fill('.')
    let cycle = 0, x = 0
    for (const [instruction, value] of parseInput(input)) {
        for (let i = 0, len = instruction === 'noop' ? 1 : 2; i < len; i++, cycle++) {
            if (x <= (cycle % 40) && (cycle % 40) <= x + 2) {
                display[cycle] = '#'
            }
        }
        x += value ?? 0
    }
    return asciiToText(display)
}
