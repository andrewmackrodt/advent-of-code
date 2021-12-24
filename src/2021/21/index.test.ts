import { solve } from './index.js'

describe('Day 21', () => {
    const input = `Player 1 starting position: 4
Player 2 starting position: 8`

    it('returns the score', () => {
        expect(solve(input)).toEqual(739785)
    })
})
