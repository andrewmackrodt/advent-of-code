export function countOccurrences(input, digits) {
    return input.split('\n').reduce((total, entry) => (total + entry.split(' | ')[1]
        .split(' ')
        .filter(o => digits.includes(o.length)).length), 0);
}
export function sumOutputs(input) {
    let result = 0;
    for (const line of input.split('\n')) {
        const [signal, output] = line.split(' | ').map(s => s.split(' ').map(s => s.split('').sort().join('')));
        const mapped = {
            1: signal.filter(s => s.length === 2)[0],
            4: signal.filter(s => s.length === 4)[0],
            7: signal.filter(s => s.length === 3)[0],
            8: signal.filter(s => s.length === 7)[0],
        };
        const assertOne = (predicate) => {
            const matches = signal.filter(predicate);
            if (matches.length !== 1) {
                throw new Error('Logic error');
            }
            return matches[0];
        };
        const filterPattern = (length, pattern, common) => {
            return assertOne(s => (s.length === length && s.split('').filter(c => pattern.includes(c)).length === common));
        };
        mapped[9] = filterPattern(6, mapped[4], 4); // 9 has 6 chars, intersects with 4 at 4 positions
        mapped[6] = filterPattern(6, mapped[1], 1); // 6 has 6 chars, intersects with 1 at 1 position
        mapped[0] = assertOne(s => s.length === 6 && ![mapped[9], mapped[6]].includes(s)); // 0 is remaining 6 char
        mapped[5] = filterPattern(5, mapped[6], 5); // 5 has 5 chars, intersects with 6 at 5 positions
        mapped[3] = filterPattern(5, mapped[1], 2); // 3 has 5 chars, intersects with 1 at 2 positions
        mapped[2] = assertOne(s => s.length === 5 && ![mapped[5], mapped[3]].includes(s)); // 2 is remaining 5 char
        const indicies = Object.values(mapped);
        const code = parseInt(output.map(s => indicies.indexOf(s)).join(''), 10);
        result += code;
    }
    return result;
}
export const partOne = (input) => countOccurrences(input, [2, 3, 4, 7]);
export const partTwo = (input) => sumOutputs(input);
