import { getMaxY, getUniqueValidVelocityCount } from './index.js'

describe('Day 17', () => {
    const input = 'target area: x=20..30, y=-10..-5'

    it('returns the highest y position', () => {
        expect(getMaxY(input)).toEqual(45)
    })

    it('returns the number of unique velocity values that land in the target area', () => {
        expect(getUniqueValidVelocityCount(input)).toEqual(112)
    })
})
