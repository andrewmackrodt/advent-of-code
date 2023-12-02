interface Game {
    id: number
    set: Record<string, number>
}

function parseInput(input: string): Game[] {
    const games: Game[] = []
    for (const line of input.trim().split('\n')) {
        const [idRawStr, setsRawStr] = line.split(':').map(s => s.trim())
        const idStr = idRawStr.match(/(\d+)$/)?.[1]
        if ( ! idStr || ! setsRawStr) continue
        const id = parseInt(idStr)
        const set: Record<string, number> = {}
        setsRawStr.split(';').forEach(str => str.trim().split(',').forEach(cubeRawStr => {
            const [qtyStr, colour] = cubeRawStr.trim().split(' ')
            const qty = parseInt(qtyStr)
            if ( ! (colour in set) || set[colour] < qty) set[colour] = qty
        }))
        games.push({ id, set })
    }
    return games
}

export function partOne(input: string): number {
    const max: Record<string, number> = { red: 12, green: 13, blue: 14 }
    return parseInput(input)
        .filter(game => ! Object.entries(game.set).find(([c, qty]) => c in max && max[c] < qty ))
        .reduce((sum, game) => sum + game.id, 0)
}
