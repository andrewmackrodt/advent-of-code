export function partOne(input: string): number {
    let sum = 0
    for (const line of input.trim().replaceAll(/[ \t]+$/gm, '').split('\n')) {
        const [, card] = line.split(':')
        const [win, own] = card.split('|').map(s => s.trim().split(/\D+/).map(s => parseInt(s)))
        const matches = win.reduce((res, n) => res + Number(own.includes(n)), 0)
        const score = matches ? Math.pow(2, matches - 1) : 0
        sum += score
    }
    return sum
}
