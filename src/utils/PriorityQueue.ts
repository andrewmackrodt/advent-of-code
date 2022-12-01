type Comparator<T> = (a: T, b: T) => boolean

/**
 * @see https://stackoverflow.com/a/42919752/650329
 */
export class PriorityQueue<T> implements Iterable<T> {
    private static readonly TOP = 0
    private readonly heap: T[]
    private readonly comparator: Comparator<T>

    public constructor(comparator: Comparator<T> = (a: T, b: T) => a > b) {
        this.heap = []
        this.comparator = comparator
    }

    public get length(): number {
        return this.heap.length
    }

    public isEmpty(): boolean {
        return this.length == 0
    }

    public peek() {
        return this.heap[PriorityQueue.TOP]
    }

    public push(...values: T[]) {
        values.forEach(value => {
            this.heap.push(value)
            this.siftUp()
        })
        return this.length
    }

    public pop() {
        const poppedValue = this.peek()
        const bottom = this.length - 1
        if (bottom > PriorityQueue.TOP) {
            this.swap(PriorityQueue.TOP, bottom)
        }
        this.heap.pop()
        this.siftDown()
        return poppedValue
    }

    public replace(value: T) {
        const replacedValue = this.peek()
        this.heap[PriorityQueue.TOP] = value
        this.siftDown()
        return replacedValue
    }

    private greater(i: number, j: number) {
        return this.comparator(this.heap[i], this.heap[j])
    }

    private swap(i: number, j: number) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }

    private siftUp() {
        let node = this.length - 1
        while (node > PriorityQueue.TOP && this.greater(node, PriorityQueue.parent(node))) {
            this.swap(node, PriorityQueue.parent(node))
            node = PriorityQueue.parent(node)
        }
    }

    private siftDown() {
        let node = PriorityQueue.TOP
        while (
            (PriorityQueue.left(node) < this.length && this.greater(PriorityQueue.left(node), node)) ||
            (PriorityQueue.right(node) < this.length && this.greater(PriorityQueue.right(node), node))
            ) {
            const maxChild = (PriorityQueue.right(node) < this.length && this.greater(PriorityQueue.right(node), PriorityQueue.left(node))) ? PriorityQueue.right(node) : PriorityQueue.left(node)
            this.swap(node, maxChild)
            node = maxChild
        }
    }

    private static parent(i: number) {
        return  ((i + 1) >>> 1) - 1
    }

    private static left(i: number) {
        return (i << 1) + 1
    }

    private static right(i: number) {
        return (i + 1) << 1
    }

    public [Symbol.iterator](): Iterator<T> {
        return {
            next: (): IteratorResult<T> => {
                return { done: this.heap.length === 0, value: this.pop()! }
            },
        }
    }
}
