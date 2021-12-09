interface Movement {
    x1: number
    y1: number
    x2: number
    y2: number
}

export function solve(input: string): number {
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
        // vertical movement
        if (m.x1 === m.x2) {
            const [y1, y2] = [m.y1, m.y2].sort(numericSort)
            for (let y = y1; y <= y2; y++) {
                field[y][m.x1]++
            }
        }
        // horizontal movement
        else if (m.y1 === m.y2) {
            const [x1, x2] = [m.x1, m.x2].sort(numericSort)
            for (let x = x1; x <= x2; x++) {
                field[m.y1][x]++
            }
        }
    }

    return field.flat().filter(n => n > 1).length
}
