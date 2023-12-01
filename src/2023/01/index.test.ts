import { partOne, partTwo } from './index.js'

describe('solve', () => {
    const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(142)
    })

const input2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

    it('returns part two answer', () => {
        expect(partTwo(input2)).toEqual(281)
    })
})
