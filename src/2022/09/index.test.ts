import { partOne, partTwo } from './index.js'

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const partTwoInputs: [string, number][] = [
    [input, 1],
    [`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`, 36],
]

describe('part one', () => {
    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(13)
    })
})

describe('part two', () => {
    Object.values(partTwoInputs).forEach(([input, expectation], i) => {
        it(`returns part two answer [${i}]`, () => {
            expect(partTwo(input)).toEqual(expectation)
        })
    })
})
