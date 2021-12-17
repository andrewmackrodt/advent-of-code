import { solve } from './index.js'

describe('Day 17', () => {
    const input = 'target area: x=20..30, y=-10..-5'

    it('returns the highest y position', () => {
        expect(solve(input)).toEqual(45)
    })
})
