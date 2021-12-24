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
}

export function solve(input: string): number {
    const players = input.trim().split('\n')
        .map(s => parseInt(s.replace(/.+: /, ''), 10))
        .filter(n => ! isNaN(n))
        .map(n => new Counter(10, n))

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

//region internal
export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => undefined
