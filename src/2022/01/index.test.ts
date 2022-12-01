import { partOne, partTwo } from './index.js'

describe('solve', () => {
    const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

    it('returns the highest calories carried', () => {
        expect(partOne(input)).toEqual(24000)
    })

    it('returns the sum of the highest 3 calories carried', () => {
        expect(partTwo(input)).toEqual(45000)
    })
})
