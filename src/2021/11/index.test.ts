import { getStepFlashesSynchronized, getTotalFlashes } from './index.js'

describe('Day 11', () => {
    const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

    it('returns the number flashes after 100 steps', () => {
        expect(getTotalFlashes(input, 100)).toEqual(1656)
    })

    it('returns the step all flashes are synchronized', () => {
        expect(getStepFlashesSynchronized(input)).toEqual(195)
    })
})
