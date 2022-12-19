import { partOne } from './index.js'

const input = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'

describe('partOne', () => {
    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(3068)
    })
})
