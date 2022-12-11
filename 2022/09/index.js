function parseInput(input) {
    return input.replaceAll(/[ \t]+$/gm, '')
        .split('\n')
        .filter(line => Boolean(line.length))
        .map(line => [line[0], parseInt(line.slice(1), 10)]);
}
export function solve(input, knotCount) {
    const steps = parseInput(input);
    const knots = new Array(knotCount).fill(null).map(() => ({ x: 0, y: 0 }));
    const tailHistory = new Set([`${knots[0].x},${knots[0].y}`]);
    for (const [direction, stepCount] of Object.values(steps)) {
        for (let i = 0; i < stepCount; i++) {
            const head = knots[knots.length - 1];
            switch (direction) {
                case 'U':
                    head.y++;
                    break;
                case 'R':
                    head.x++;
                    break;
                case 'D':
                    head.y--;
                    break;
                case 'L':
                    head.x--;
                    break;
                default: throw new Error(`Invalid direction: ${direction}`);
            }
            for (let k = knots.length - 2; k >= 0; k--) {
                const parent = knots[k + 1];
                const knot = knots[k];
                const x = parent.x - knot.x, absX = Math.abs(x);
                const y = parent.y - knot.y, absY = Math.abs(y);
                if (absX > 1 || absY > 1) {
                    if (x !== 0) {
                        knot.x += x / absX;
                    }
                    if (y !== 0) {
                        knot.y += y / absY;
                    }
                }
            }
            tailHistory.add(`${knots[0].x},${knots[0].y}`);
        }
    }
    return tailHistory.size;
}
export const partOne = (input) => solve(input, 2);
export const partTwo = (input) => solve(input, 10);
