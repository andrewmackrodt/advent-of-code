import { solve } from './index.js'

describe('Day 15', () => {
    const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

    it('returns the lowest total risk', () => {
        expect(solve(input)).toEqual(40)
    })

    it('returns the lowest total risk when cavern is 5x bigger', () => {
        expect(solve(input, 5)).toEqual(315)
    })
})
