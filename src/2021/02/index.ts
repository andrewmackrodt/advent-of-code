interface Options {
    method?: 'original' | 'accurate'
}

export function solve(input: string, options?: Options): number {
    const movements = input.split('\n').filter(s => s.length > 0)
    let x = 0, y = 0, z = 0
    for (const movement of movements) {
        const [direction, stepsStr] = movement.split(' ')
        const steps = parseInt(stepsStr)
        if (direction === 'forward') {
            x += steps
            y += z * steps
        } else if (direction === 'down') {
            z += steps
        } else if (direction === 'up') {
            z -= steps
        }
    }
    return options?.method === 'accurate' ? x * y : x * z
}

export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => solve(input, { method: 'accurate' })
