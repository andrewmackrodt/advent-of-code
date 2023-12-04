export function partOne(input: string): number {
    const lines = input.trim().split('\n').filter(Boolean)
    let sum = 0
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y]
        for (const match of line.matchAll(/\d+/g)) {
            const x1 = match.index!
            const x2 = x1 + match[0].length
            const ax1 = x1 > 0 ? x1 - 1 : x1
            const ax2 = x2 < line.length - 1 ? x2 + 1 : x2
            const ay1 = y > 0 ? y - 1 : -1
            const ay2 = y < lines.length - 1 ? y + 1 : -1
            if (
                line.substring(ax1, ax2).match(/[^.\d]/) ||
                (ay1 !== -1 && lines[ay1].substring(ax1, ax2).match(/[^.\d]/)) ||
                (ay2 !== -1 && lines[ay2].substring(ax1, ax2).match(/[^.\d]/))
            ) {
                sum += parseInt(match[0])
            }
        }
    }
    return sum
}

interface PartNumber {
    y: number
    x1: number
    x2: number
    value: number
}

export function partTwo(input: string): number {
    const partNumbers: PartNumber[] = []
    const lines = input.trim().split('\n').filter(Boolean)
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y]
        for (const match of line.matchAll(/\d+/g)) {
            const x1 = match.index!
            const x2 = x1 + match[0].length - 1
            const value = parseInt(match[0])
            partNumbers.push({ y, x1, x2, value })
        }
    }
    const addPartNumber = (adjacent: PartNumber[], y: number, x: number) => {
        const pn = partNumbers.find(pn => pn.y === y && pn.x1 <= x && x <= pn.x2)
        if (pn && ! adjacent.includes(pn)) {
            adjacent.push(pn)
        }
    }
    const addPartNumberX = (adjacent: PartNumber[], y: number, x: number, len: number) => {
        if (x < len - 1)
            addPartNumber(adjacent, y, x + 1) // left
        if (x > 0)
            addPartNumber(adjacent, y, x - 1) // right
    }
    const addPartNumberY = (adjacent: PartNumber[], y: number, x: number, len: number) => {
        addPartNumber(adjacent, y, x) // top or bottom
        addPartNumberX(adjacent, y, x, len) // left or right
    }
    let sum = 0
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y]
        for (const match of line.matchAll(/\*/g)) {
            const adjacent: PartNumber[] = []
            const x = match.index!
            addPartNumberX(adjacent, y, x, line.length) // left or right
            if (y > 0)
                addPartNumberY(adjacent, y - 1, x, line.length) // top
            if (y < lines.length - 1)
                addPartNumberY(adjacent, y + 1, x, line.length) // bottom
            if (adjacent.length === 2) {
                sum += adjacent[0].value * adjacent[1].value
            }
        }
    }
    return sum
}
