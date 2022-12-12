// PriorityQueue implementation - https://stackoverflow.com/a/42919752/650329
class PriorityQueue {
    constructor(comparator = (a, b) => a < b) {
        this.heap = [];
        this.comparator = comparator;
    }
    get length() {
        return this.heap.length;
    }
    isEmpty() {
        return this.length == 0;
    }
    peek() {
        return this.heap[PriorityQueue.TOP];
    }
    push(...values) {
        values.forEach(value => {
            this.heap.push(value);
            this.siftUp();
        });
        return this.length;
    }
    pop() {
        const poppedValue = this.peek();
        const bottom = this.length - 1;
        if (bottom > PriorityQueue.TOP) {
            this.swap(PriorityQueue.TOP, bottom);
        }
        this.heap.pop();
        this.siftDown();
        return poppedValue;
    }
    replace(value) {
        const replacedValue = this.peek();
        this.heap[PriorityQueue.TOP] = value;
        this.siftDown();
        return replacedValue;
    }
    greater(i, j) {
        return this.comparator(this.heap[i], this.heap[j]);
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    siftUp() {
        let node = this.length - 1;
        while (node > PriorityQueue.TOP && this.greater(node, PriorityQueue.parent(node))) {
            this.swap(node, PriorityQueue.parent(node));
            node = PriorityQueue.parent(node);
        }
    }
    siftDown() {
        let node = PriorityQueue.TOP;
        while ((PriorityQueue.left(node) < this.length && this.greater(PriorityQueue.left(node), node)) ||
            (PriorityQueue.right(node) < this.length && this.greater(PriorityQueue.right(node), node))) {
            const maxChild = (PriorityQueue.right(node) < this.length && this.greater(PriorityQueue.right(node), PriorityQueue.left(node))) ? PriorityQueue.right(node) : PriorityQueue.left(node);
            this.swap(node, maxChild);
            node = maxChild;
        }
    }
    static parent(i) {
        return ((i + 1) >>> 1) - 1;
    }
    static left(i) {
        return (i << 1) + 1;
    }
    static right(i) {
        return (i + 1) << 1;
    }
    [Symbol.iterator]() {
        return {
            next: () => {
                return { done: this.heap.length === 0, value: this.pop() };
            },
        };
    }
}
PriorityQueue.TOP = 0;
function parseInput(input) {
    const grid = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, grid: [] };
    input.split('\n').forEach((line, y) => {
        const row = [];
        line.split('').forEach((c, x) => {
            let n;
            if (c === 'S') {
                grid.start = { x, y };
                n = 'a'.charCodeAt(0);
            }
            else if (c === 'E') {
                grid.end = { x, y };
                n = 'z'.charCodeAt(0);
            }
            else {
                n = c.charCodeAt(0);
            }
            row.push(n);
        });
        grid.grid.push(row);
    });
    return grid;
}
function solve(input, startAnyA) {
    const { start: startVector, end: endVector, grid } = parseInput(input);
    const height = grid.length;
    const width = grid[0].length;
    const end = `${endVector.x},${endVector.y}`;
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
        steps[`${startVector.x},${startVector.y}`] = 0;
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
        if (y > 0)
            adjacent.push([x, y - 1]);
        if (x < width - 1)
            adjacent.push([x + 1, y]);
        if (y < height - 1)
            adjacent.push([x, y + 1]);
        if (x > 0)
            adjacent.push([x - 1, y]);
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
