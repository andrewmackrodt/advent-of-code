/**
 * @see https://stackoverflow.com/a/42919752/650329
 */
export class PriorityQueue {
    static TOP = 0;
    heap;
    comparator;
    constructor(comparator = (a, b) => a > b) {
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
