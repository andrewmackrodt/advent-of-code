import { solve } from './index.js'

describe('Day 12', () => {
    const input = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`

    const inputs: [number, string][] = [
        [10, `start-A
start-b
A-c
A-b
b-d
A-end
b-end`],
        [19, `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`],
        [226, input],
    ]

    inputs.map(([expected, input]) => {
        it(`returns the number of paths visiting small caves at most once: ${expected}`, () => {
            expect(solve(input)).toEqual(expected)
        })
    })

    it('returns the number of paths visiting at most one small cave twice', () => {
        expect(solve(inputs[0][1], true)).toEqual(36)
    })
})
