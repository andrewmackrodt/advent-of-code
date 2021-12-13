interface Point {
    x: number
    y: number
}

interface Fold {
    axis: 'x' | 'y'
    value: number
}

function parse(input: string): { points: Point[]; folds: Fold[] } {
    const points: Point[] = []
    const folds: Fold[] = []

    const [strPoints, strFolds] = input.split('\n\n').map(s => s.split('\n'))

    strPoints.map(s => {
        const [x, y] = s.split(',').map(s => parseInt(s, 10))
        points.push({ x, y })
    })

    strFolds.map(s => {
        const match = s.match(/(?<axis>[xy])=(?<value>[0-9]+)/)
        if ( ! match?.groups) return
        folds.push({
            axis: match.groups.axis,
            value: parseInt(match.groups.value, 10),
        } as Fold)
    })

    return { points, folds }
}

export function solve(input: string, foldLimit = 0): number {
    const { points, folds } = parse(input)
    const state: number[][] = []
    for (
        let width = 1 + points.reduce((res, p) => Math.max(res, p.x), 0),
            height = 1 + points.reduce((res, p) => Math.max(res, p.y), 0),
            y = 0;
        y < height;
        y++
    ) {
        state.push(new Array(width).fill(0))
    }
    for (const point of points) {
        state[point.y][point.x] = 1
    }
    let foldCount = 0
    for (const fold of folds) {
        switch (fold.axis) {
            case 'x':
                for (let y = 0; y < state.length; y++) {
                    const right = state[y].splice(fold.value).reverse()
                    for (let x = 0; x < state[0].length; x++) {
                        if (right[x] > 0) {
                            state[y][x]++
                        }
                    }
                }
                break
            case 'y':
                const bottom = state.splice(fold.value).reverse()
                for (let y = 0; y < state.length; y++) {
                    for (let x = 0; x < state[0].length; x++) {
                        if (bottom[y][x] > 0) {
                            state[y][x]++
                        }
                    }
                }
                break
        }
        if (++foldCount >= foldLimit && foldLimit !== 0) {
            break
        }
    }

    return state.reduce((total, row) => (
        total + row.reduce((rowTotal, cell) => rowTotal + Math.min(cell, 1), 0)
    ), 0)
}
