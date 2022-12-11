var Selection;
(function (Selection) {
    Selection[Selection["Rock"] = 1] = "Rock";
    Selection[Selection["Paper"] = 2] = "Paper";
    Selection[Selection["Scissors"] = 3] = "Scissors";
})(Selection || (Selection = {}));
var Result;
(function (Result) {
    Result[Result["Win"] = 6] = "Win";
    Result[Result["Lose"] = 0] = "Lose";
    Result[Result["Draw"] = 3] = "Draw";
})(Result || (Result = {}));
function getSelection(p1, p2, elfStrategy) {
    const theirs = (p1 === 'A' ? Selection.Rock : (p1 === 'B' ? Selection.Paper : Selection.Scissors));
    let ours;
    if (elfStrategy) {
        switch (p2) {
            case 'X':
                ours = theirs - 1 > 0 ? theirs - 1 : 3;
                break;
            case 'Y':
                ours = theirs;
                break;
            default:
                ours = theirs + 1 <= 3 ? theirs + 1 : 1;
                break;
        }
    }
    else {
        ours = (p2 === 'X' ? Selection.Rock : (p2 === 'Y' ? Selection.Paper : Selection.Scissors));
    }
    return [theirs, ours];
}
function getScore(theirs, ours) {
    const getResult = () => {
        if (theirs === ours) {
            return Result.Draw;
        }
        else if (ours === theirs + 1 || theirs === Selection.Scissors && ours === Selection.Rock) {
            return Result.Win;
        }
        else {
            return Result.Lose;
        }
    };
    return getResult() + ours;
}
export function solve(input, elfStrategy = false) {
    return input.split('\n').filter(s => Boolean(s))
        .map(s => getSelection(s.split(/\s+/g)[0], s.split(/\s+/g)[1], elfStrategy))
        .map(a => getScore(a[0], a[1]))
        .reduce((total, n) => total + n, 0);
}
export const partOne = (input) => solve(input);
export const partTwo = (input) => solve(input, true);
