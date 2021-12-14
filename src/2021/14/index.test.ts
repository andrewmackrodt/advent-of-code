import { solve } from './index.js'

describe('Day 14', () => {
    const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

    it('returns the result of the polymer after 10 steps', () => {
        expect(solve(input, 10)).toEqual(1588)
    })
})
