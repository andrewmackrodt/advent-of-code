export function partOne(input) {
    const lines = input.trim().replaceAll(/[ \t]+$/gm, '').split('\n');
    const pairs = [];
    for (const line of lines) {
        const pair = [0, 0];
        for (let i = 0; i < line.length; i++) {
            if (line[i].match(/[0-9]/)) {
                const num = parseInt(line[i]);
                if (pair[0] === 0) {
                    pair[0] = num;
                }
                pair[1] = num;
            }
        }
        pairs.push(pair);
    }
    return pairs
        .map(([a, b]) => parseInt(a.toString() + b.toString()))
        .reduce((sum, n) => sum + n, 0);
}
const numberTextMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};
const numberTextRegExp = new RegExp('^(?:' + Object.keys(numberTextMap).join('|') + ')');
export function partTwo(input) {
    const lines = input.trim().replaceAll(/[ \t]+$/gm, '').split('\n');
    const pairs = [];
    for (const line of lines) {
        const pair = [0, 0];
        for (let i = 0; i < line.length; i++) {
            if (line[i].match(/[0-9]/)) {
                const num = parseInt(line[i]);
                if (pair[0] === 0) {
                    pair[0] = num;
                }
                pair[1] = num;
            }
            else {
                const match = numberTextRegExp.exec(line.substring(i, i + 5));
                if (match) {
                    const num = numberTextMap[match[0]];
                    if (pair[0] === 0) {
                        pair[0] = num;
                    }
                    pair[1] = num;
                }
            }
        }
        pairs.push(pair);
    }
    return pairs
        .map(([a, b]) => parseInt(a.toString() + b.toString()))
        .reduce((sum, n) => sum + n, 0);
}
