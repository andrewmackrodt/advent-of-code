import { PriorityQueue } from '../../utils/PriorityQueue.js';
function parseInput(input) {
    const grid = [];
    let start = null, end = null;
    input.split('\n').forEach((line, y) => {
        const row = [];
        line.split('').forEach((c, x) => {
            let n;
            if (c === 'S') {
                start = `${x},${y}`;
                n = 'a'.charCodeAt(0);
            }
            else if (c === 'E') {
                end = `${x},${y}`;
                n = 'z'.charCodeAt(0);
            }
            else {
                n = c.charCodeAt(0);
            }
            row.push(n);
        });
        grid.push(row);
    });
    if (!start || !end)
        throw new Error('Input error could not parse start or end position');
    return { start, end, grid };
}
function solve(input, startAnyA) {
    const { start, end, grid } = parseInput(input);
    const height = grid.length;
    const width = grid[0]?.length ?? 0;
    const steps = {};
    if (startAnyA) {
        const aCharCode = 'a'.charCodeAt(0);
        for (let y = 0; y < height; y++)
            for (let x = 0; x < width; x++) {
                if (grid[y][x] === aCharCode) {
                    steps[`${x},${y}`] = 0;
                }
            }
    }
    else {
        steps[start] = 0;
    }
    const queue = new PriorityQueue((a, b) => a[1] < b[1]);
    for (const start of Object.keys(steps)) {
        queue.push([start, 0]);
    }
    const visited = new Set();
    for (const [current] of queue) {
        if (visited.has(current)) {
            continue;
        }
        visited.add(current);
        const [x, y] = current.split(',').map(s => parseInt(s, 10));
        const adjacent = [];
        if (current !== end) {
            if (y > 0)
                adjacent.push([x, y - 1]);
            if (x < width - 1)
                adjacent.push([x + 1, y]);
            if (y < height - 1)
                adjacent.push([x, y + 1]);
            if (x > 0)
                adjacent.push([x - 1, y]);
        }
        for (const [ax, ay] of adjacent) {
            // skip if elevation of the destination square is more than one higher than the current square
            if (grid[ay][ax] > grid[y][x] + 1) {
                continue;
            }
            const next = `${ax},${ay}`;
            if (!(next in steps) || steps[current] + 1 < steps[next]) {
                steps[next] = steps[current] + 1;
                queue.push([next, steps[next]]);
            }
        }
    }
    return steps[end];
}
export const partOne = (input) => solve(input, false);
export const partTwo = (input) => solve(input, true);
