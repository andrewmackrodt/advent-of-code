export function solve(input, count = 1) {
    return input.split('\n\n').filter(s => Boolean(s)).map(s => s.split('\n')
        .filter(s => s.length > 0)
        .map(s => parseInt(s))
        .reduce((total, n) => total + n, 0))
        .sort((a, b) => b - a).slice(0, count).reduce((total, n) => total + n, 0);
}
export const partOne = (input) => solve(input);
export const partTwo = (input) => solve(input, 3);
