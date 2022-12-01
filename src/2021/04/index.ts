function* generator(input: string): Generator<number> {
    const lines = input.split('\n\n')
    const picks = lines.shift()!.split(',').map(s => parseInt(s, 10))
    let boards = lines.map(board => (
        board.split('\n')
            .map(line => line.split(/ +/)
                .filter(s => s.length > 0)
                .map(s => parseInt(s.trim(), 10)),
            )
    ))

    const markNumberAndGetScoreIfBoardComplete = (pick: number, board: number[][]): number | undefined => {
        // HADOKEN =D
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

    for (const pick of picks) {
        for (const board of boards) {
            const score = markNumberAndGetScoreIfBoardComplete(pick, board)
            if (typeof score === 'number') {
                boards = boards.filter(b => b !== board)
                yield score
            }
        }
    }

    return 0
}

export function getWinningBoardScore(input: string): number {
    return generator(input).next().value
}

export function getLosingBoardScore(input: string): number {
    let lastScore = 0
    for (const winningScore of generator(input)) {
        lastScore = winningScore
    }
    return lastScore
}

export const partOne = (input: string) => getWinningBoardScore(input)
export const partTwo = (input: string) => getLosingBoardScore(input)
