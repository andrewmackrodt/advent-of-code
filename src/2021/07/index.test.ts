import { solve } from './index.js'

describe('Day 07', () => {
    const input = '16,1,2,0,4,2,7,1,2,14'

    it('returns the minimum constant fuel usage', () => {
        expect(solve(input)).toEqual(37)
    })

    it('returns the minimum linear fuel usage', () => {
        expect(solve(input, { burn: 'linear' })).toEqual(168)
    })
})
