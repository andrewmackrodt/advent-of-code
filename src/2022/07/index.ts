type Stat = (number | Stat)[]

function parseInput(input: string): Stat {
    let jsonStr = input.replaceAll(/[ \t]+$/gm, '')
        .split('\n')
        .filter(line => Boolean(line.length) && line.match(/^(?:\$ cd |[0-9]+ )/))
        .map(line => line
            .replace(/^\$ cd \.\./, '],')
            .replace(/^\$ cd .+/, ',[')
            .replace(/^([0-9]+) .+/, '$1,'),
        )
        .join('')
        .replaceAll(/,{2,}/g, ',')
        .replaceAll(/^,|,$/g, '')
        .replaceAll(/,\]/g, ']')
        .replaceAll(/\[,/g, '[')

    for (
        let openCount = jsonStr.match(/\[/g)?.length ?? 0, closeCount = jsonStr.match(/\]/g)?.length ?? 0;
        closeCount < openCount;
        closeCount++
    ) {
        jsonStr += ']'
    }

    return JSON.parse(jsonStr)
}

function recurse(stats: Stat, cb?: (total: number) => void): number {
    let total = 0
    for (const stat of stats) {
        if (Array.isArray(stat)) {
            total += recurse(stat, cb)
        } else {
            total += stat
        }
    }
    if (cb) {
        cb(total)
    }
    return total
}

export function partOne(input: string): number {
    let result = 0
    recurse(parseInput(input), size => {
        if (size <= 100000) {
            result += size
        }
    })
    return result
}

export function partTwo(input: string): number {
    const available = 70000000, required = 30000000
    const totals: number[] = []
    const used = recurse(parseInput(input), size => totals.push(size))
    const minSize = required - (available - used)
    return totals.filter(n => n >= minSize).sort((a, b) => a - b)[0]
}
