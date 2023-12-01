type Pair = [string, string]

const numberTextMap: Record<string, string> = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
}

function solve(input: string, matchWords = false): number {
    const lines = input.trim().replaceAll(/[ \t]+$/gm, '').split('\n')
    const pairs: Pair[] = []
    const matchValues = Object.values(numberTextMap)
    if (matchWords) {
        matchValues.push(...Object.keys(numberTextMap))
    }
    const regExp = new RegExp('(?=(' + matchValues.map(n => n.toString()).join('|') + '))', 'g')
    for (const line of lines) {
        const pair: Pair = ['0', '0']
        for (const match of line.matchAll(regExp)) {
            const num = match[1].length === 1 ? match[1] : numberTextMap[match[1]]
            if (pair[0] === '0') {
                pair[0] = num
            }
            pair[1] = num
        }
        pairs.push(pair)
    }
    return pairs.reduce((sum, [a, b]) => sum + parseInt(a + b), 0)
}

export const partOne = (input: string) => solve(input, false)
export const partTwo = (input: string) => solve(input, true)
