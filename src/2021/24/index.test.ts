import { ALU, parseInput } from './index.js'

describe('Day 24', () => {
    const input = `inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`

    const instructions = parseInput(input)

    it('alu runs instructions', () => {
        const alu = new ALU(7)
        alu.run(instructions)
        expect([
            alu.valueOf('w'),
            alu.valueOf('x'),
            alu.valueOf('y'),
            alu.valueOf('z'),
        ]).toEqual([0, 1, 1, 1])
    })
})
