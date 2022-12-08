import { partOne } from './index.js'

describe('solve', () => {
    const input = `30373
25512
65332
33549
35390`

    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(21)
    })
})
