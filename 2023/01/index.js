const numberTextMap = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
};
export function partOne(input, matchWords = false) {
    const lines = input.trim().replaceAll(/[ \t]+$/gm, '').split('\n');
    const pairs = [];
    const matchValues = Object.values(numberTextMap);
    if (matchWords) {
        matchValues.push(...Object.keys(numberTextMap));
    }
    const regExp = new RegExp('(?=(' + matchValues.map(n => n.toString()).join('|') + '))', 'g');
    for (const line of lines) {
        const pair = ['0', '0'];
        for (const match of line.matchAll(regExp)) {
            const num = match[1].length === 1 ? match[1] : numberTextMap[match[1]];
            if (pair[0] === '0') {
                pair[0] = num;
            }
            pair[1] = num;
        }
        pairs.push(pair);
    }
    return pairs.map(([a, b]) => parseInt(a + b)).reduce((sum, n) => sum + n, 0);
}
export const partTwo = (input) => partOne(input, true);
