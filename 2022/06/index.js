function detectStart(input, count) {
    const map = input.slice(0, count).split('').reduce((res, c) => {
        res[c] = (res[c] ?? 0) + 1;
        return res;
    }, {});
    let unique = Object.keys(map).length;
    let i = 0, start = count;
    for (let len = input.length; unique !== count && i < len; i++, start++) {
        const head = input[i];
        if (--map[head] === 0) {
            unique--;
            delete map[head];
        }
        const tail = input[start];
        if (tail in map) {
            map[tail]++;
        }
        else {
            map[tail] = 1;
            unique++;
        }
    }
    return start < input.length ? start : -1;
}
export const partOne = (input) => detectStart(input.trim(), 4);
export const partTwo = (input) => detectStart(input.trim(), 14);
