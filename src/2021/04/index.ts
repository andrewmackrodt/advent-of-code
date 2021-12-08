export function solve(input: string): number {
    const lines = input.split('\n\n')
    const picks = lines.shift()!.split(',').map(s => parseInt(s, 10))
    const boards = lines.map(board => (
        board.split('\n')
            .map(line => line.split(/ +/)
                .filter(s => s.length > 0)
                .map(s => parseInt(s.trim(), 10)),
            )
    ))

    // HADOKEN ===D
    for (const pick of picks) {
        for (const board of boards) {
            for (let y = 0; y < board.length; y++) {
                const line = board[y]
                for (let x = 0; x < line.length; x++) {
                    const num = line[x]
                    if (num === pick) {
                        line[x] = NaN
                        if (
                            line.filter(n => ! isNaN(n)).length === 0 ||
                            board.map(line => line[x]).filter(n => ! isNaN(n)).length === 0
                        ) {
                            const sumUnmarked = board.flat()
                                .filter(n => ! isNaN(n))
                                .reduce((res, cur) => res + cur, 0)

                            return sumUnmarked * pick
                        }
                    }
                }
            }
        }
    }

    return 0
}
