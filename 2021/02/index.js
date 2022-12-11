export function solve(input, options) {
    const movements = input.split('\n').filter(s => s.length > 0);
    let x = 0, y = 0, z = 0;
    for (const movement of movements) {
        const [direction, stepsStr] = movement.split(' ');
        const steps = parseInt(stepsStr);
        if (direction === 'forward') {
            x += steps;
            y += z * steps;
        }
        else if (direction === 'down') {
            z += steps;
        }
        else if (direction === 'up') {
            z -= steps;
        }
    }
    return options?.method === 'accurate' ? x * y : x * z;
}
export const partOne = (input) => solve(input);
export const partTwo = (input) => solve(input, { method: 'accurate' });
