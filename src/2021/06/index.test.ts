import { solve } from './index.js'

describe('Day 06', () => {
    const input = '3,4,3,1,2'

    it('returns the number of lanternfish after 80 days', () => {
        expect(solve(input)).toEqual(5934)
    })
})
