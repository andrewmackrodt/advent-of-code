const errorPoints = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};
const autocompletePoints = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};
const chunks = ['()', '[]', '{}', '<>'];
function getChunk(char) {
    const pair = chunks.find(s => s.includes(char));
    if (!pair)
        throw new Error(`Unknown symbol: ${char}`);
    return {
        value: char,
        type: pair[0] === char ? 'open' : 'close',
        inverse: char === pair[0] ? pair[1] : pair[0],
    };
}
function parse(input) {
    const result = [];
    for (const line of input.split('\n')) {
        const chunks = [];
        const stack = [];
        let score = 0;
        for (const c of line) {
            const chunk = getChunk(c);
            if (chunk.type === 'open') {
                chunks.push(chunk);
                stack.push(chunk);
            }
            else {
                const expected = stack[stack.length - 1];
                if (chunk.value !== expected?.inverse) {
                    score = errorPoints[c];
                    break;
                }
                else {
                    stack.pop();
                    chunks.push(chunk);
                }
            }
        }
        const state = score === 0
            ? (stack.length > 0 ? 'incomplete' : 'complete')
            : 'error';
        if (state === 'incomplete') {
            for (let chunk = stack.pop(); chunk; chunk = stack.pop()) {
                score = (5 * score) + autocompletePoints[chunk.inverse];
            }
        }
        result.push({ chunks, state, score });
    }
    return result;
}
export function getErrorScore(input) {
    return parse(input)
        .filter(l => l.state === 'error')
        .reduce((totalScore, line) => totalScore + line.score, 0);
}
export function getMiddleAutocompleteScore(input) {
    const scores = parse(input)
        .filter(l => l.state === 'incomplete')
        .sort((a, b) => b.score - a.score);
    const middleIdx = Math.floor(scores.length / 2);
    return scores[middleIdx].score;
}
export const partOne = (input) => getErrorScore(input);
export const partTwo = (input) => getMiddleAutocompleteScore(input);
