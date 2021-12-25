class Counter {
    private readonly max: number
    private _value: number
    private _count = 0
    private _score = 0

    public constructor(max: number, value = max) {
        this.max = max
        this._value = value
    }

    public get value(): number {
        return this._value
    }

    public get count(): number {
        return this._count
    }

    public get score(): number {
        return this._score
    }

    public increment(count = 1): number {
        const remainder = (this._value + count) % this.max
        this._value = remainder !== 0 ? remainder : this.max
        this._count++
        this._score += this._value
        return this._value
    }

    public clone(): Counter {
        const copy = new Counter(this.max, this._value)
        copy._count = this._count
        copy._score = this._score
        return copy
    }
}

function parseInput(input: string): Counter[] {
    return input.trim().split('\n')
        .map(s => parseInt(s.replace(/.+: /, ''), 10))
        .filter(n => ! isNaN(n))
        .map(n => new Counter(10, n))
}

export function partOne(input: string): number {
    const players = parseInput(input)
    const dice = new Counter(100)

    for (let isGameOver = false; ! isGameOver; ) {
        for (const player of players) {
            player.increment(dice.increment() +
                             dice.increment() +
                             dice.increment())

            if (player.score >= 1000) {
                isGameOver = true
                break
            }
        }
    }

    const [loser] = players.sort((a, b) => a.score - b.score)

    return loser.score * dice.count
}

interface QuantumResult {
    p1: number
    p2: number
}

export function partTwo(input: string): number {
    // cartesian product of 3 x [1, 2, 3]
    const rollCounts = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]]
    const cache: Record<string, QuantumResult> = {}

    const getQuantumResult = (p1: Counter, p2: Counter): QuantumResult => {
        const key = `${p1.value}:${p1.score},${p2.value}:${p2.score}`

        if (key in cache) {
            return cache[key]
        }

        const result: QuantumResult = { p1: 0, p2: 0 }

        for (const [p1Roll, p1Count] of rollCounts) {
            const np1 = p1.clone()
            np1.increment(p1Roll)
            if (np1.score < 21) {
                for (const [p2Roll, p2Count] of rollCounts) {
                    const np2 = p2.clone()
                    np2.increment(p2Roll)
                    if (np2.score < 21) {
                        const next = getQuantumResult(np1, np2)
                        result.p1 += next.p1 * p1Count * p2Count
                        result.p2 += next.p2 * p1Count * p2Count
                    } else {
                        result.p2 += p2Count
                    }
                }
            } else {
                result.p1 += p1Count
            }
        }

        return cache[key] = result
    }

    const [p1, p2] = parseInput(input)
    const res = getQuantumResult(p1, p2)

    return Math.max(res.p1, res.p2)
}

