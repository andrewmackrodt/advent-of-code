import { partOne } from './index.js'

describe('solve', () => {
    const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(31)
    })
})
