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
