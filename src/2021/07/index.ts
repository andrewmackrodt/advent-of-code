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

    public getMinimumUsage(): number {
        const positions = Object.keys(this.positions).map(n => parseInt(n, 10))

        while (positions.length > 1) {
            const midIndex = Math.floor(positions.length / 2)

            if (positions.length % 2 === 0) {
                const midLeftIndex = midIndex - 1
                const midRightIndex = midIndex
                // move left
                if (this.getUsage(positions[midLeftIndex]) < this.getUsage(positions[midRightIndex])) {
                    positions.splice(midLeftIndex + 1)
                }
                // move right
                else {
                    positions.splice(0, midRightIndex)
                }
            } else {
                // move left
                if (this.getUsage(positions[0]) < this.getUsage(positions[positions.length - 1])) {
                    positions.splice(midIndex + 1)
                }
                // move right
                else {
                    positions.splice(0, midIndex)
                }
            }
        }

        return this.getUsage(positions[0])
    }

    private getUsage(target: number) {
        let moves = 0
        for (const key in this.positions) {
            const position = parseInt(key, 10)
            const diff = Math.abs(target - position)
            if (diff > 0) {
                moves += diff * this.positions[key]
            }
        }
        return moves
    }
}

export function solve(input: string): number {
    const fuelCalculator = FuelCalculator.createFromString(input)

    return fuelCalculator.getMinimumUsage()
}
