import type { TreeArray } from './index.js'
import { SnailfishUtils, getMagnitudeOfFinalSum, Tree, getLargestMagnitudeOf2 } from './index.js'

type TestCase<R = TreeArray<number>> = {
    input: TreeArray<number>
    expected: R
}

describe('Day 18', () => {
    it('merges two inputs', () => {
        const [one, two] = [Tree.createFromArray([1, 1]), Tree.createFromArray([4, 4])]
        const result = SnailfishUtils.merge(one, two)
        const json = JSON.stringify(result.toArray())
        expect(json).toEqual(JSON.stringify([[1,1],[4,4]]))
    })

    const explodeTestCases: TestCase[] = [
        { input: [[[[[9, 8], 1], 2], 3], 4], expected: [[[[0, 9], 2], 3], 4] },
        { input: [7, [6, [5, [4, [3, 2]]]]], expected: [7, [6, [5, [7, 0]]]] },
        { input: [[6, [5, [4, [3, 2]]]], 1], expected: [[6, [5, [7, 0]]], 3] },
        { input: [[3, [2, [1, [7, 3]]]], [6, [5, [4, [3, 2]]]]], expected: [[3, [2, [8, 0]]], [9, [5, [4, [3, 2]]]]] },
        { input: [[3, [2, [8, 0]]], [9, [5, [4, [3, 2]]]]], expected: [[3, [2, [8, 0]]], [9, [5, [7, 0]]]] },
        { input: [[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]], expected: [[[[0,7],4],[7,[[8,4],9]]],[1,1]] },
        { input: [[[[0,7],4],[7,[[8,4],9]]],[1,1]], expected: [[[[0,7],4],[15,[0,13]]],[1,1]] },
        { input: [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]], expected: [[[[0,7],4],[[7,8],[6,0]]],[8,1]] },
    ]

    explodeTestCases.forEach(({ input, expected }) => {
        it(`explodes the input: ${JSON.stringify(input)}`, () => {
            const tree = Tree.createFromArray(input)
            SnailfishUtils.explode(tree)
            const result = JSON.stringify(tree.toArray())
            expect(result).toEqual(JSON.stringify(expected))
        })
    })

    const splitTestCases: TestCase[] = [
        { input: [[[[0,7],4],[15,[0,13]]],[1,1]], expected: [[[[0,7],4],[[7,8],[0,13]]],[1,1]] },
        { input: [[[[0,7],4],[[7,8],[0,13]]],[1,1]], expected: [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]] },
    ]

    splitTestCases.forEach(({ input, expected }) => {
        it(`splits the input: ${JSON.stringify(input)}`, () => {
            const tree = Tree.createFromArray(input)
            SnailfishUtils.split(tree)
            const result = JSON.stringify(tree.toArray())
            expect(result).toEqual(JSON.stringify(expected))
        })
    })

    it('reduces the input', () => {
        const tree = Tree.createFromArray([[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]])
        SnailfishUtils.reduce(tree)
        const result = JSON.stringify(tree.toArray())
        expect(result).toEqual(JSON.stringify([[[[0,7],4],[[7,8],[6,0]]],[8,1]]))
    })

    it('sums the input: 0', () => {
        const input: TreeArray<number>[] = [
            [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],
            [7,[[[3,7],[4,3]],[[6,3],[8,8]]]],
            [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]],
            [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]],
            [7,[5,[[3,8],[1,4]]]],
            [[2,[2,2]],[8,[8,1]]],
            [2,9],
            [1,[[[9,3],9],[[9,0],[0,7]]]],
            [[[5,[7,4]],7],1],
            [[[[4,2],2],6],[8,7]],
        ]

        const inputTreeNodes = input.map(arr => Tree.createFromArray(arr))
        const result = SnailfishUtils.sum(...inputTreeNodes)
        const formatted = JSON.stringify(result.toArray())
        const expected = [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]

        expect(formatted).toEqual(JSON.stringify(expected))
    })

    it('sums the input: 1', () => {
        const input: TreeArray<number>[] = [
            [[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]],
            [[[5,[2,8]],4],[5,[[9,9],0]]],
            [6,[[[6,2],[5,6]],[[7,6],[4,7]]]],
            [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]],
            [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]],
            [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]],
            [[[[5,4],[7,7]],8],[[8,3],8]],
            [[9,3],[[9,9],[6,[4,9]]]],
            [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]],
            [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]],
        ]

        const inputTreeNodes = input.map(arr => Tree.createFromArray(arr))
        const result = SnailfishUtils.sum(...inputTreeNodes)
        const formatted = JSON.stringify(result.toArray())
        const expected = [[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]

        expect(formatted).toEqual(JSON.stringify(expected))
    })

    const magnitudeInputs: TestCase<number>[] = [
        { input: [[1,2],[[3,4],5]], expected: 143 },
        { input: [[[[0,7],4],[[7,8],[6,0]]],[8,1]], expected: 1384 },
        { input: [[[[1,1],[2,2]],[3,3]],[4,4]], expected: 445 },
        { input: [[[[3,0],[5,3]],[4,4]],[5,5]], expected: 791 },
        { input: [[[[5,0],[7,4]],[5,5]],[6,6]], expected: 1137 },
        { input: [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]], expected: 3488 },
    ]

    magnitudeInputs.forEach(({ input, expected }) => {
        it(`returns the magnitude: ${JSON.stringify(input)}`, () => {
            const tree = Tree.createFromArray(input)
            const result = SnailfishUtils.magnitude(tree)
            expect(result).toEqual(expected)
        })
    })

    const input = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`

    it('returns the magnitude of the final sum', () => {
        expect(getMagnitudeOfFinalSum(input)).toEqual(4140)
    })

    it('returns the largest magnitude of any sum of two numbers', () => {
        expect(getLargestMagnitudeOf2(input)).toEqual(3993)
    })
})
