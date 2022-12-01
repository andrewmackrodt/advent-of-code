import { partOne, partTwo } from './index.js'

describe('Day 21', () => {
    const input = `Player 1 starting position: 4
Player 2 starting position: 8`

    it('partOne', () => {
        expect(partOne(input)).toEqual(739785)
    })

    it('partTwo', () => {
        expect(partTwo(input)).toEqual(444356092776315)
    })
})
