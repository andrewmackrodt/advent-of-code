const points: Record<string, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

const chunks = ['()', '[]', '{}', '<>']

interface Chunk {
    value: string
    type: 'open' | 'close'
    inverse: string
    points: number
}

function getChunk(char: string): Chunk {
    const pair = chunks.find(s => s.includes(char))
    if ( ! pair) throw new Error(`Unknown symbol: ${char}`)
    return {
        value: char,
        type: pair[0] === char ? 'open' : 'close',
        inverse: char === pair[0] ? pair[1] : pair[0],
        points: points[pair[1]],
    }
}

export function solve(input: string, skipLineOnError = true): number {
    let errorScore = 0

    for (const line of input.split('\n')) {
        const stack: Chunk[] = []
        let lineErrorCount = 0
        for (const c of line) {
            const chunk = getChunk(c)
            if (chunk.type === 'open') {
                stack.push(chunk)
            } else {
                const expected = stack[stack.length - 1]
                if (chunk.value !== expected?.inverse) {
                    lineErrorCount++
                    errorScore += chunk.points
                    if (skipLineOnError) {
                        break
                    }
                } else {
                    stack.pop()
                }
            }
        }
    }

    return errorScore
}
