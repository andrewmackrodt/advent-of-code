import { solve } from './index.js'

describe('Day 05', () => {
    const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

    it('returns number of points horizontal and vertical lines overlap', () => {
        expect(solve(input)).toEqual(5)
    })

    it('returns number of points all lines overlap', () => {
        expect(solve(input, { diagonal: true })).toEqual(12)
    })
})
