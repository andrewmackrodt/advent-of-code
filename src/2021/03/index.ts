export function solve(input: string[]): number {
    if (input.length === 0) {
        return 0
    }

    const countBitsEnabled: number[] = new Array(input[0].length).fill(0)

    for (const line of input) {
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '1') {
                countBitsEnabled[i]++
            }
        }
    }

    const minSignificantCount = Math.floor(input.length / 2) + 1
    const gammaBits: number[] = []
    const epsilonBits: number[] = []

    for (const count of countBitsEnabled) {
        if (count >= minSignificantCount) {
            gammaBits.push(1)
            epsilonBits.push(0)
        } else {
            gammaBits.push(0)
            epsilonBits.push(1)
        }
    }

    const gamma = parseInt(gammaBits.join(''), 2)
    const epsilon = parseInt(epsilonBits.join(''), 2)

    return gamma * epsilon
}
