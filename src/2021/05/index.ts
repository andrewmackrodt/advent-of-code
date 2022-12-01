interface Movement {
    x1: number
    y1: number
    x2: number
    y2: number
}

interface Options {
    diagonal?: boolean
}

export function solve(input: string, options?: Options): number {
    const movements: Movement[] = input.split('\n')
        .filter(s => s.length > 0)
        .map(s => {
            const split = s.replace(/[^0-9,]+/, ',')
                .split(',')
                .map(s => parseInt(s))

            return Object.assign({}, ...['x1', 'y1', 'x2', 'y2'].map((key, i) => (
                { [key]: split[i] }
            )))
        })

    if (movements.length === 0) {
        return 0
    }

    const numericSort = (a: number, b: number) => a - b

    const width = movements.map(m => m.x1).concat(movements.map(m => m.x2)).sort(numericSort).pop()! + 1
    const height = movements.map(m => m.y1).concat(movements.map(m => m.y2)).sort(numericSort).pop()! + 1
    const field = new Array(height).fill(null).map(() => new Array(width).fill(0))

    for (const m of movements) {
        let yCount = Math.abs(m.y2 - m.y1) + 1
        let xCount = Math.abs(m.x2 - m.x1) + 1
        const isDiagonal = yCount !== 1 && xCount !== 1

        if (isDiagonal) {
            if (yCount !== xCount) {
                throw new Error(`Invalid diagonal movement: ${JSON.stringify(m)}`)
            }
            if ( ! options?.diagonal) {
                continue
            }
        }

        for (let x = m.x1, y = m.y1; yCount > 0 || xCount > 0; ) {
            field[y][x]++
            if (yCount-- > 1) {
                y = m.y1 > m.y2 ? y - 1 : y + 1
            }
            if (xCount-- > 1) {
                x = m.x1 > m.x2 ? x - 1 : x + 1
            }
        }
    }

    return field.flat().filter(n => n > 1).length
}

export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => solve(input, { diagonal: true })
