import { partOne, partTwo } from './index.js'

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

describe('partOne', () => {
    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(24)
    })
})

describe('partTwo', () => {
    it('returns part two answer', () => {
        expect(partTwo(input)).toEqual(93)
    })
})
