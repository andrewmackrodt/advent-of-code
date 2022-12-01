interface Options {
    burn?: 'constant' | 'linear'
}

const calc = {
    median: (values: number[]): number => {
        const sorted = values.sort((a, b) => a - b)
        if (sorted.length % 2 === 0) {
            const rightIndex = sorted.length / 2
            const sum = sorted[rightIndex - 1] + sorted[rightIndex]
            return sum / 2
        } else {
            return sorted[Math.floor(sorted.length / 2)]
        }
    },
    sum: (values: number[]) => {
        return values.reduce((res, cur) => res + cur, 0)
    },
}

export function solve(input: string, options?: Options): number {
    const positions = input.split(',').map(s => parseInt(s, 10)).sort((a, b) => a - b)

    const totalCost = (cost: (startingPosition: number) => number): number => {
        return calc.sum(positions.map(p => cost(p)))
    }

    switch (options?.burn) {
        case 'linear':
            const cost = (startingPosition: number, endingPosition: number) => {
                let change = Math.abs(startingPosition - endingPosition)
                for (let i = 1, len = change; i < len; i++) {
                    change += i
                }
                return change
            }

            const mean = calc.sum(positions) / positions.length
            if (mean % 2 !== 0) {
                const min = totalCost((p) => cost(p, Math.floor(mean)))
                const max = totalCost((p) => cost(p, Math.ceil(mean)))
                return Math.min(min, max)
            } else {
                return totalCost((p) => cost(p, mean))
            }
        default:
            const median = calc.median(positions)
            return totalCost(p => Math.abs(p - median))
    }
}

export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => solve(input, { burn: 'linear' })
