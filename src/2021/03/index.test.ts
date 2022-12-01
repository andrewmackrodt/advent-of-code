import { getLifeSupportRating, getPowerConsumption } from './index.js'

describe('Day 03', () => {
    const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

    it('returns power consumption', () => {
        expect(getPowerConsumption(input)).toEqual(198)
    })

    it('returns life support rating', () => {
        expect(getLifeSupportRating(input)).toEqual(230)
    })
})
