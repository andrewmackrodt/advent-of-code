function parseInput(input) {
    return input.trim().split('\n').map((line) => {
        const [a, b] = line.split(':');
        const idStr = a.trim().match(/(\d+)$/)?.[1];
        if (!idStr) {
            return;
        }
        const id = parseInt(idStr);
        const sets = b?.trim().split(';').map(set => (set.trim().split(',').reduce((cubes, cube) => {
            const [qtyStr, colour] = cube.trim().split(' ');
            cubes[colour] = parseInt(qtyStr);
            return cubes;
        }, {})));
        if (!sets) {
            return;
        }
        return { id, sets };
    })
        .filter(game => game?.sets.length);
}
export function partOne(input) {
    const max = { red: 12, green: 13, blue: 14 };
    return parseInput(input)
        .filter(game => !game.sets.find(set => Object.entries(set).find(([colour, qty]) => (colour in max && max[colour] < qty))))
        .reduce((sum, game) => sum + game.id, 0);
}
export function partTwo(input) {
    return parseInput(input)
        .map(game => game.sets.reduce((res, set) => {
        for (const [colour, qty] of Object.entries(set)) {
            if (!(colour in res) || qty > res[colour]) {
                res[colour] = qty;
            }
        }
        return res;
    }, {}))
        .reduce((sum, set) => sum + Object.values(set).reduce((pow, n) => pow * n, 1), 0);
}
