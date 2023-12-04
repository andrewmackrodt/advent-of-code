import { partOne, partTwo } from './index.js'

describe('solve', () => {
    const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(4361)
    })

    it('returns part two answer', () => {
        expect(partTwo(input)).toEqual(467835)
    })
})
