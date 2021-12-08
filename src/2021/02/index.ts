export function solve(input: string): number {
    let x = 0, y = 0
    for (const movement of input.split('\n')) {
        const [direction, stepsStr] = movement.split(' ')
        const steps = parseInt(stepsStr)
        if (direction === 'forward') x += steps
        else if (direction === 'down') y += steps
        else if (direction === 'up') y -= steps
    }
    return x * y
}
