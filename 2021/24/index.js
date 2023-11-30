export class ALU {
    params = {
        w: 0,
        x: 0,
        y: 0,
        z: 0,
    };
    buffer;
    constructor(serial) {
        this.buffer = serial.toString(10).split('').map(s => parseInt(s, 10));
    }
    run(instructions) {
        const flat = (Array.isArray(instructions[0])
            ? instructions.flat()
            : instructions);
        for (const instruction of flat) {
            const [operation, param] = instruction;
            if (operation === 'inp') {
                this.inp(param);
            }
            else {
                const value = instruction[2];
                this[operation](param, value);
            }
        }
    }
    inp(a) {
        const value = this.buffer.shift();
        if (typeof value === 'undefined') {
            throw new Error('no inp values available');
        }
        this.params[a] = value;
    }
    add(a, b) {
        this.params[a] = this.params[a] + this._valueOf(b);
    }
    mul(a, b) {
        this.params[a] = this.params[a] * this._valueOf(b);
    }
    div(a, b) {
        this.params[a] = Math.floor(this.params[a] / this._valueOf(b));
    }
    mod(a, b) {
        this.params[a] = this.params[a] % this._valueOf(b);
    }
    eql(a, b) {
        this.params[a] = Number(this.params[a] === this._valueOf(b));
    }
    valueOf(param) {
        return this.params[param];
    }
    _valueOf(param) {
        if (typeof param === 'string') {
            param = this.valueOf(param);
        }
        return param;
    }
}
const inputRegExp = /^(?:(inp) ([w-z])|(add|mul|div|mod|eql) ([w-z]) ([w-z]|0|-?[1-9][0-9]*))/;
export function parseInput(input) {
    return input.replace(/\n(inp .+)/g, '\n\n$1')
        .split('\n\n')
        .map(group => group.split('\n').map((line, i) => {
        const match = inputRegExp.exec(line);
        if (!match)
            throw new Error(`parse error as line ${i + 1}: ${line}`);
        if (match[1])
            return ['inp', match[2]];
        const value = parseInt(match[5]);
        if (!isNaN(value))
            return [match[3], match[4], value];
        return [match[3], match[4], match[5]];
    }));
}
// https://www.reddit.com/r/adventofcode/comments/rnejv5/comment/hpuo5c6/
function monad(instructions, biggest = true) {
    const result = Array(14);
    const stack = [];
    for (let i = 0; i < 14; i++) {
        const addX = instructions[i][5][2];
        if (addX <= 0) {
            const [addY, y] = stack.pop();
            let add;
            if (biggest) {
                add = 9;
                while (add + addY + addX > 9)
                    add--;
            }
            else {
                add = 1;
                while (add + addY + addX < 1)
                    add++;
            }
            result[y] = add;
            result[i] = add + addY + addX;
        }
        else {
            const addY = instructions[i][15][2];
            stack.push([addY, i]);
        }
    }
    return parseInt(result.join(''), 10);
}
function verify(instructions, serial) {
    const alu = new ALU(serial);
    alu.run(instructions);
    if (alu.valueOf('z') !== 0) {
        throw new Error(`alu z result is non-zero for input ${serial}`);
    }
}
export function solve(input, biggest = true) {
    const instructions = parseInput(input);
    const serial = monad(instructions, biggest);
    verify(instructions, serial);
    return serial;
}
export const partOne = (input) => solve(input);
export const partTwo = (input) => solve(input, false);
