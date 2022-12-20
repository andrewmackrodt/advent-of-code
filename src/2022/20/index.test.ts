import { partOne } from './index.js'

const input = `1
2
-3
3
-2
0
4`

describe('partOne', () => {
    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(3)
    })
})
