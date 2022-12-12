import { partOne, partTwo } from './index.js'

describe('solve', () => {
    const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(31)
    })

    it('returns part two answer', () => {
        expect(partTwo(input)).toEqual(29)
    })
})
