interface Options {
    burn?: 'constant' | 'linear'
}

class FuelCalculator {
    private readonly positions: Record<number, number> = {}
    private min = Number.MAX_SAFE_INTEGER
    private max = 0

    public static createFromString(input: string): FuelCalculator {
        const instance = new FuelCalculator()
        input.split(',').map(s => {
            const n = parseInt(s, 10)
            if (n < instance.min) instance.min = n
            if (instance.max < n) instance.max = n
            if ( ! (n in instance.positions)) instance.positions[n] = 0
            instance.positions[n]++
        })
        return instance
    }

    public getMinimumUsage(options?: Options): number {
        if ( ! options?.burn) console.warn('calling getMinimumUsage without specifying options.burn is deprecated')

        let left = this.min
        let right = this.max

        for (let diff = right - left; diff > 0; diff = right - left) {
            const midIndex = (left + right) / 2

            if (midIndex % 2 === 0) {
                const midLeftIndex = midIndex - 1
                const midRightIndex = midIndex
                // move left
                if (this.getUsage(midLeftIndex, options) < this.getUsage(midRightIndex, options)) {
                    right = midLeftIndex + 1
                }
                // move right
                else {
                    left = midRightIndex
                }
            } else {
                // move left
                if (this.getUsage(left, options) < this.getUsage(right, options)) {
                    right = Math.floor(midIndex)
                }
                // move right
                else {
                    left = Math.ceil(midIndex)
                }
            }
        }

        return this.getUsage(left, options)
    }

    private getUsage(target: number, options?: Options) {
        let moves = 0
        for (const key in this.positions) {
            const position = parseInt(key, 10)
            let diff = Math.abs(target - position)
            if (options?.burn === 'linear') {
                for (let i = 1, len = diff; i < len; i++) {
                    diff += i
                }
            }
            if (diff > 0) {
                moves += diff * this.positions[key]
            }
        }
        return moves
    }
}

export function solve(input: string, options?: Options): number {
    const fuelCalculator = FuelCalculator.createFromString(input)

    return fuelCalculator.getMinimumUsage(options)
}

export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => solve(input, { burn: 'linear' })
