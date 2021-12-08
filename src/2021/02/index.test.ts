import { solve } from './index.js'

describe('solve', () => {
    const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`

    it('returns original calculation', () => {
        expect(solve(input)).toEqual(150)
    })

    it('returns accurate calculation', () => {
        expect(solve(input, { method: 'accurate' })).toEqual(900)
    })
})
