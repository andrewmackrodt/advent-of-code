import { partOne } from './index.js'

describe('solve', () => {
    const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(13)
    })
})
