import { partOne } from './index.js'

describe('solve', () => {
    const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(142)
    })
})
