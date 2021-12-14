import { getRiskLevelOfLowPoints, getLargestBasinsLengthMultiplied } from './index.js'

describe('Day 09', () => {
    const input = `2199943210
3987894921
9856789892
8767896789
9899965678`

    it('returns the sum of the risk level of all low points', () => {
        expect(getRiskLevelOfLowPoints(input)).toEqual(15)
    })

    it('returns the length of 3 largest basins multiplied', () => {
        expect(getLargestBasinsLengthMultiplied(input, 3)).toEqual(1134)
    })
})
