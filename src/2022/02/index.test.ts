import { partOne, partTwo } from './index.js'

describe('solve', () => {
    const input = `A Y
B X
C Z`

    it('returns the total score using part one strategy', () => {
        expect(partOne(input)).toEqual(15)
    })

    it('returns the total score using part two strategy', () => {
        expect(partTwo(input)).toEqual(12)
    })
})
