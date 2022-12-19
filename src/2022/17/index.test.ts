import { partOne, partTwo } from './index.js'

const input = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'

describe('partOne', () => {
    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(3068)
    })
})

describe('partTwo', () => {
    it('returns part two answer', () => {
        expect(partTwo(input)).toEqual(1514285714288)
    })
})
