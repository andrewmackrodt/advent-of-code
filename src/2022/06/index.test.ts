import { partOne } from './index.js'

const input = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'

describe('part one', () => {
    const partOneInputs = {
        [input]: 7,
        bvwbjplbgvbhsrlpgdmjqwftvncz: 5,
        nppdvjthqldpwncqszvftbrmjlhg: 6,
        nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: 10,
        zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: 11,
    }

    Object.entries(partOneInputs).forEach(([input, expectation], i) => {
        it(`returns answer [${i}]`, () => {
            expect(partOne(input)).toEqual(expectation)
        })
    })
})
