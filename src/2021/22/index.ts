interface Bound {
    min: number
    max: number
}

interface Bound3D {
    x: Bound
    y: Bound
    z: Bound
}

type Operation = 'on' | 'off'

interface Step extends Bound3D {
    readonly operation: Operation
}

function parseInput(input: string): Step[] {
    return input.trim().split('\n')
        .filter(s => s.length > 0)
        .map((line, i): Step => {
            const operation = line.match(/^(on|off) /)?.[1] as Operation | undefined
            if ( ! operation) throw new Error(`parse error line ${i + 1}`)
            const extractBound = (axis: string): Bound => {
                const regExp = new RegExp(`\\b${axis}=(-?[0-9]+)\.\.(-?[0-9]+)`)
                const match = regExp.exec(line)
                if ( ! match) throw new Error(`parse error line ${i + 1}`)
                return { min: parseInt(match[1], 10), max: parseInt(match[2], 10) }
            }
            return {
                operation,
                x: extractBound('x'),
                y: extractBound('y'),
                z: extractBound('z'),
            }
        })
}

export function solve(input: string): number {
    const steps = parseInput(input)
    const enabled: Set<string> = new Set()

    for (const step of steps) {
        for (let x = Math.max(-50, step.x.min), xLen = Math.min(50, step.x.max); x <= xLen; x++) {
            for (let y = Math.max(-50, step.y.min), yLen = Math.min(50, step.y.max); y <= yLen; y++) {
                for (let z = Math.max(-50, step.z.min), zLen = Math.min(50, step.z.max); z <= zLen; z++) {
                    const key = `${x},${y},${z}`
                    if (step.operation === 'on') {
                        enabled.add(key)
                    } else {
                        enabled.delete(key)
                    }
                }
            }
        }
    }

    return enabled.size
}

//region internal
export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => undefined
