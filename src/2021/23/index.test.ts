import { partOne, partTwo } from './index.js'

describe('Day 23', () => {
    const input = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`

    it('partOne returns the least energy to room all amphipods', () => {
        expect(partOne(input)).toEqual(12521)
    })

    it('partTwo returns the least energy to room all amphipods', () => {
        expect(partTwo(input)).toEqual(44169)
    })
})
