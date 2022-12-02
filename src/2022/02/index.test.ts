import { partOne } from './index.js'

describe('solve', () => {
    const input = `A Y
B X
C Z`

    it('returns the total score', () => {
        expect(partOne(input)).toEqual(15)
    })
})
