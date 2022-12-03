import { partOne, partTwo } from './index.js'

describe('solve', () => {
    const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(157)
    })

    it('returns part two answer', () => {
        expect(partTwo(input)).toEqual(70)
    })
})
