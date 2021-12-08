function getSignificantBits(input: string[]) : string[] {
    if (input.length === 0) {
        return []
    }

    const countBitsEnabled: number[] = new Array(input[0].length).fill(0)

    for (const line of input) {
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '1') {
                countBitsEnabled[i]++
            }
        }
    }

    const minSignificantCount = Math.ceil(input.length / 2)

    return countBitsEnabled.map(c => c >= minSignificantCount ? '1' : '0')
}

export function getPowerConsumption(input: string): number {
    const arrayOfBits = input.split('\n').filter(s => s.length > 0)
    const significantBits = getSignificantBits(arrayOfBits)
    const gammaBits: number[] = []
    const epsilonBits: number[] = []

    for (const bit of significantBits) {
        if (bit === '1') {
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

export function getLifeSupportRating(input: string): number {
    const filterInput = (
        input: string[],
        i: number,
        cb: (a: string, b: string) => boolean,
    ): string[] => {
        if (input.length <= 1) {
            return input
        }

        return input.filter(s => cb(s[i], getSignificantBits(input)[i]))
    }

    const arrayOfBits = input.split('\n').filter(s => s.length > 0)
    let oxygenBits = arrayOfBits
    let co2 = arrayOfBits

    for (let i = 0; i < arrayOfBits[0].length; i++) {
        oxygenBits = filterInput(oxygenBits, i, (a, b) => a === b)
        co2 = filterInput(co2, i, (a, b) => a !== b)
    }

    const oxygen = parseInt(oxygenBits.join(''), 2)
    const epsilon = parseInt(co2.join(''), 2)

    return oxygen * epsilon
}

export const partOne = (input: string) => getPowerConsumption(input)
export const partTwo = (input: string) => getLifeSupportRating(input)
