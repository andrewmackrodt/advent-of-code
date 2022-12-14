import { partOne, partTwo } from './index.js'

describe('solve', () => {
    const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(2)
    })

    it('returns part two answer', () => {
        expect(partTwo(input)).toEqual(4)
    })
})
