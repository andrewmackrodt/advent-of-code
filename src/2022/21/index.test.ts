import { partOne, partTwo } from './index.js'

const input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`

describe('partOne', () => {
    it('returns part one answer', () => {
        expect(partOne(input)).toEqual(152)
    })
})

describe('partTwo', () => {
    it('returns part two answer', () => {
        expect(partTwo(input)).toEqual(301)
    })
})
