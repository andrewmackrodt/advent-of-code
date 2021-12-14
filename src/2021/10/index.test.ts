import { getMiddleAutocompleteScore, getErrorScore } from './index.js'

describe('Day 10', () => {
    const input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

    it('returns the syntax error score', () => {
        expect(getErrorScore(input)).toEqual(26397)
    })

    it('returns the middle autocomplete score', () => {
        expect(getMiddleAutocompleteScore(input)).toEqual(288957)
    })
})
