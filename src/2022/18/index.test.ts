import { partOne, partTwo } from './index.js'

const input = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`

describe('partOne', () => {
    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(64)
    })
})

describe('partTwo', () => {
    it('returns part two answer', () => {
        expect(partTwo(input)).toEqual(58)
    })
})
