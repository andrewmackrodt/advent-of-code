import { solve } from './index.js'

describe('Day 25', () => {
    const input = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`

    it('returns the step the sea cucumbers stop moving', () => {
        expect(solve(input)).toEqual(58)
    })
})
