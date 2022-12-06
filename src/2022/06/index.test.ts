import { partOne, partTwo } from './index.js'

const input = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'

const inputs = {
    [input]: [7, 19],
    bvwbjplbgvbhsrlpgdmjqwftvncz: [5, 23],
    nppdvjthqldpwncqszvftbrmjlhg: [6, 23],
    nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: [10, 29],
    zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: [11, 26],
}

describe('part one', () => {
    Object.entries(inputs).forEach(([input, [expectation]], i) => {
        it(`returns answer [${i}]`, () => {
            expect(partOne(input)).toEqual(expectation)
        })
    })
})

describe('part two', () => {
    Object.entries(inputs).forEach(([input, [_, expectation]], i) => {
        it(`returns answer [${i}]`, () => {
            expect(partTwo(input)).toEqual(expectation)
        })
    })
})
