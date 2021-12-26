type Operation = 'inp' | 'add' | 'mul' | 'div' | 'mod' | 'eql'
type Param = 'w' | 'x' | 'y' | 'z'
type Instruction = ['inp', Param] | [Exclude<Operation, 'inp'>, Param, Param | number]

export class ALU {
    private readonly params: Record<Param, number> = {
        w: 0,
        x: 0,
        y: 0,
        z: 0,
    }

    private readonly buffer: number[]

    public constructor(serial: number) {
        this.buffer = serial.toString(10).split('').map(s => parseInt(s, 10))
    }

    public run(instructions: Instruction[]): void
    public run(instructions: Instruction[][]): void

    public run(instructions: Instruction[] | Instruction[][]): void {
        const flat = (Array.isArray(instructions[0])
            ? instructions.flat()
            : instructions) as Instruction[]
        for (const instruction of flat) {
            const [operation, param] = instruction
            if (operation === 'inp') {
                this.inp(param)
            } else {
                const value = instruction[2]
                this[operation](param, value)
            }
        }
    }

    public inp(a: Param) {
        const value = this.buffer.shift()

        if (typeof value === 'undefined') {
            throw new Error('no inp values available')
        }

        this.params[a] = value
    }

    public add(a: Param, b: Param | number) {
        this.params[a] = this.params[a] + this._valueOf(b)
    }

    public mul(a: Param, b: Param | number) {
        this.params[a] = this.params[a] * this._valueOf(b)
    }

    public div(a: Param, b: Param | number) {
        this.params[a] = Math.floor(this.params[a] / this._valueOf(b))
    }

    public mod(a: Param, b: Param | number) {
        this.params[a] = this.params[a] % this._valueOf(b)
    }

    public eql(a: Param, b: Param | number) {
        this.params[a] = Number(this.params[a] === this._valueOf(b))
    }

    public valueOf(param: Param): number {
        return this.params[param]
    }

    private _valueOf(param: Param | number): number {
        if (typeof param === 'string') {
            param = this.valueOf(param)
        }

        return param
    }
}

const inputRegExp = /^(?:(inp) ([w-z])|(add|mul|div|mod|eql) ([w-z]) ([w-z]|0|-?[1-9][0-9]*))/

export function parseInput(input: string): Instruction[][] {
    return input.replace(/\n(inp .+)/g, '\n\n$1')
        .split('\n\n')
        .map(group => group.split('\n').map((line, i) => {
            const match = inputRegExp.exec(line)
            if ( ! match) throw new Error(`parse error as line ${i + 1}: ${line}`)
            if (match[1]) return ['inp', match[2]]
            const value = parseInt(match[5])
            if ( ! isNaN(value)) return [match[3], match[4], value]
            return [match[3], match[4], match[5]]
        })) as Instruction[][]
}

// https://www.reddit.com/r/adventofcode/comments/rnejv5/comment/hpuo5c6/
function monad(instructions: Instruction[][]): number {
    const result = Array<number>(14)
    const stack: [number, number][] = []
    for (let i = 0; i < 14; i++) {
        const addX = instructions[i][5][2] as number
        if (addX <= 0) {
            const [addY, y] = stack.pop()!
            let add = 9
            while (add + addY + addX > 9) add--
            result[y] = add
            result[i] = add + addY + addX
        } else {
            const addY = instructions[i][15][2] as number
            stack.push([addY, i])
        }
    }
    return parseInt(result.join(''), 10)
}

function verify(instructions: Instruction[][], serial: number) {
    const alu = new ALU(serial)
    alu.run(instructions)
    if (alu.valueOf('z') !== 0) {
        throw new Error(`alu z result is non-zero for input ${serial}`)
    }
}

export function solve(input: string): number {
    const instructions = parseInput(input)
    const serial = monad(instructions)
    verify(instructions, serial)

    return serial
}

//region internal
export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => undefined
