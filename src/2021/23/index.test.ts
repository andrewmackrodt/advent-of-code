import { solve } from './index.js'

describe('Day 23', () => {
    const input = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`

    it('returns the least energy to room all amphipods', () => {
        expect(solve(input)).toEqual(12521)
    })
})
