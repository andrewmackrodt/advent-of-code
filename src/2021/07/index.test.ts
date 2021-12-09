import { solve } from './index.js'

describe('Day 07', () => {
    const input = '16,1,2,0,4,2,7,1,2,14'

    it('returns the minimum fuel usage', () => {
        expect(solve(input)).toEqual(37)
    })
})
