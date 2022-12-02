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

function getSelection(p1: string, p2: string, elfStrategy: boolean): [Selection, Selection] {
    const theirs = (p1 === 'A' ? Selection.Rock : (p1 === 'B' ? Selection.Paper : Selection.Scissors))
    let ours: Selection
    if (elfStrategy) {
        switch (p2) {
            case 'X':
                ours = theirs - 1 > 0 ? theirs - 1 : 3
                break
            case 'Y':
                ours = theirs
                break
            default:
                ours = theirs + 1 <= 3 ? theirs + 1 : 1
                break
        }
    } else {
        ours = (p2 === 'X' ? Selection.Rock : (p2 === 'Y' ? Selection.Paper : Selection.Scissors))
    }
    return [theirs, ours]
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

export function solve(input: string, elfStrategy = false): number {
    return input.split('\n').filter(s => Boolean(s))
        .map(s => getSelection(s.split(/\s+/g)[0], s.split(/\s+/g)[1], elfStrategy))
        .map(a => getScore(a[0], a[1]))
        .reduce((total, n) => total + n, 0)
}

export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => solve(input, true)
