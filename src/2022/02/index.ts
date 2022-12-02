enum Selection {
    Rock = 1,
    Paper = 2,
    Scissors = 3,
}

enum Result {
    Win = 6,
    Lose = 0,
    Draw = 3,
}

function getSelection(c: string): Selection {
    if (c === 'A' || c === 'X') return Selection.Rock
    if (c === 'B' || c === 'Y') return Selection.Paper
    if (c === 'C' || c === 'Z') return Selection.Scissors
    throw new Error('Invalid selection')
}

function getScore(theirs: Selection, ours: Selection): number {
    const getResult = (): number => {
        if (theirs === ours) {
            return Result.Draw
        } else if (ours === theirs + 1 || theirs === Selection.Scissors && ours === Selection.Rock) {
            return Result.Win
        } else {
            return Result.Lose
        }
    }

    return getResult() + ours
}

export function solve(input: string): number {
    return input.split('\n').filter(s => Boolean(s))
        .map(s => s.split(/\s+/g).map(c => getSelection(c)))
        .map(a => getScore(a[0], a[1]))
        .reduce((total, n) => total + n, 0)
}

export const partOne = (input: string) => solve(input)
