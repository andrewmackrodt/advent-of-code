class Counter {
    max;
    _value;
    _count = 0;
    _score = 0;
    constructor(max, value = max) {
        this.max = max;
        this._value = value;
    }
    get value() {
        return this._value;
    }
    get count() {
        return this._count;
    }
    get score() {
        return this._score;
    }
    increment(count = 1) {
        const remainder = (this._value + count) % this.max;
        this._value = remainder !== 0 ? remainder : this.max;
        this._count++;
        this._score += this._value;
        return this._value;
    }
    clone() {
        const copy = new Counter(this.max, this._value);
        copy._count = this._count;
        copy._score = this._score;
        return copy;
    }
}
function parseInput(input) {
    return input.trim().split('\n')
        .map(s => parseInt(s.replace(/.+: /, ''), 10))
        .filter(n => !isNaN(n))
        .map(n => new Counter(10, n));
}
export function partOne(input) {
    const players = parseInput(input);
    const dice = new Counter(100);
    for (let isGameOver = false; !isGameOver;) {
        for (const player of players) {
            player.increment(dice.increment() +
                dice.increment() +
                dice.increment());
            if (player.score >= 1000) {
                isGameOver = true;
                break;
            }
        }
    }
    const [loser] = players.sort((a, b) => a.score - b.score);
    return loser.score * dice.count;
}
export function partTwo(input) {
    // cartesian product of 3 x [1, 2, 3]
    const rollCounts = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]];
    const cache = {};
    const getQuantumResult = (p1, p2) => {
        const key = `${p1.value}:${p1.score},${p2.value}:${p2.score}`;
        if (key in cache) {
            return cache[key];
        }
        const result = { p1: 0, p2: 0 };
        if (p1.score >= 21) {
            result.p1++;
        }
        else if (p2.score >= 21) {
            result.p2++;
        }
        else {
            for (const [roll, count] of rollCounts) {
                const np1 = p1.clone();
                np1.increment(roll);
                const next = getQuantumResult(p2, np1);
                result.p1 += next.p2 * count;
                result.p2 += next.p1 * count;
            }
        }
        return cache[key] = result;
    };
    const [p1, p2] = parseInput(input);
    const res = getQuantumResult(p1, p2);
    return Math.max(res.p1, res.p2);
}
