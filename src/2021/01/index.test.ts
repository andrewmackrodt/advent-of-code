import { solve } from './index.js'

describe('solve', () => {
    const input = `199
200
208
210
200
207
240
269
260
263`

    it('returns count without window', () => {
        expect(solve(input)).toEqual(7)
    })

    it('returns count with window', () => {
        expect(solve(input, 3)).toEqual(5)
    })
})
