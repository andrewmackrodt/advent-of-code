/**
 * hex character mappings
 * @see https://www.reddit.com/r/adventofcode/comments/5h52ro/comment/daxv8cr/
 */
const asciiHexMap: Record<string, string> = {
    /* eslint-disable quote-props */
    '19297a52': 'A', '392e4a5c': 'B', '1928424c': 'C', '39294a5c': 'D',
    '3d0e421e': 'E', '3d0e4210': 'F', '19285a4e': 'G', '252f4a52': 'H',
    '1c42108e': 'I', 'c210a4c': 'J', '254c5292': 'K', '2108421e': 'L',
    '19294a4c': 'O', '39297210': 'P', '39297292': 'R', '1d08305c': 'S',
    '1c421084': 'T', '25294a4c': 'U', '23151084': 'Y', '3c22221e': 'Z',
    /* eslint-enable quote-props */
}

type Char = ' ' | '.' | '#'

function splitString<T extends string>(string: string, cols: number): T[] {
    return string.replaceAll(/\n/g, '')
        .replaceAll(new RegExp(`(.{${cols}})`, 'g'), '$1\n')
        .replace(/\n$/, '')
        .split('\n') as T[]
}

export function asciiToText<T extends Char>(ascii: T, cols?: number): string
export function asciiToText<T extends Char>(ascii: T[], cols?: number): string
export function asciiToText<T extends Char>(ascii: T[][]): string

export function asciiToText<T extends Char>(ascii: T | T[] | T[][], cols: number = 40): string {
    const lines = (Array.isArray(ascii)
        ? Array.isArray(ascii[0])
            ? ascii.map(a => (a as T[]).join(''))
            : ascii[0].length === 1 ? splitString(ascii.join(''), cols) : ascii
        : splitString(ascii, cols)) as T[]
    let chars = ''
    for (let i = 0; i < lines[0].length; i += 5) {
        let char = ''
        for (const line of lines) {
            char += line.substring(i, i + 5)
        }
        const binaryString = char.replaceAll(/[. ]/g, '0').replaceAll(/#/g, '1')
        const hex = parseInt(binaryString, 2).toString(16)
        if ( ! (hex in asciiHexMap)) {
            return lines.join('\n')
        }
        chars += asciiHexMap[hex]
    }
    return chars
}
