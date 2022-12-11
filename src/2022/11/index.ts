interface Monkey {
    items: number[]
    operation: (item: number) => number
    test: { value: number; true: number; false: number }
}

const monkeyRegExp = new RegExp(/^Monkey ([0-9]+):$/)
const itemsRegExp = new RegExp(/^Starting items: ([0-9]+(?:, ?[0-9]+)*)$/)
const operationRegExp = new RegExp(/^Operation: new = (old|[0-9]+) ?([*+]) ?(old|[0-9]+)$/)
const testRegExp = new RegExp(/^Test: divisible by ([0-9]+)$/)
const ifTrueRegExp = new RegExp(/^If true: throw to monkey ([0-9]+)$/)
const ifFalseRegExp = new RegExp(/^If false: throw to monkey ([0-9]+)$/)

function parseInput(input: string): Monkey[] {
    const behaviours: Monkey[] = []
    let behaviour: Monkey

    input.trim().replaceAll(/^[ \t]+|[ \t]+$/gm, '')
        .split('\n')
        .filter(line => Boolean(line.length))
        .forEach((line) => {
            let match: RegExpExecArray | null
            switch (true) {
                case (match = monkeyRegExp.exec(line)) !== null:
                    behaviour = {
                        items: [],
                        operation: (item: number) => item,
                        test: { value: -1, true: -1, false: -1 },
                    }
                    behaviours[parseInt(match![1], 10)] = behaviour
                    break
                case (match = itemsRegExp.exec(line)) !== null:
                    behaviour.items = match![1].split(/, ?/).map(s => parseInt(s, 10))
                    break
                case (match = operationRegExp.exec(line)) !== null:
                    const [opA, symbol, opB] = match!.slice(1)
                    behaviour.operation = item => {
                        const valA = opA === 'old' ? item : parseInt(opA, 10)
                        const valB = opB === 'old' ? item : parseInt(opB, 10)
                        switch (symbol) {
                            case '*':
                                return valA * valB
                            case '+':
                                return valA + valB
                            default:
                                throw new Error(`Parse error: ${line}`)
                        }
                    }
                    break
                case (match = testRegExp.exec(line)) !== null:
                    behaviour.test.value = parseInt(match![1], 10)
                    break
                case (match = ifTrueRegExp.exec(line)) !== null:
                    behaviour.test.true = parseInt(match![1], 10)
                    break
                case (match = ifFalseRegExp.exec(line)) !== null:
                    behaviour.test.false = parseInt(match![1], 10)
                    break
                default:
                    throw new Error(`Parse error: ${line}`)
            }
        })

    return behaviours
}

export function solve(input: string, rounds: number, useMod: boolean) {
    const behaviours = parseInput(input)
    const counts = new Array(behaviours.length).fill(0)
    const mod = behaviours.reduce((a, b) => a * b.test.value, 1)
    for (let round = 0; round < rounds; round++) {
        for (const monkey in behaviours) {
            const behaviour = behaviours[monkey]
            while (behaviour.items.length > 0) {
                let worry = behaviour.items.shift()!
                worry = behaviour.operation(worry)
                worry = useMod ? worry % mod : Math.floor(worry / 3)
                counts[monkey]++
                const nextMonkey = worry % behaviour.test.value === 0
                    ? behaviour.test.true
                    : behaviour.test.false
                behaviours[nextMonkey].items.push(worry)
            }
        }
    }
    return counts.sort((a, b) => b - a).slice(0, 2).reduce((total, v) => total * v, 1)
}

export const partOne = (input: string) => solve(input, 20, false)
export const partTwo = (input: string) => solve(input, 10000, true)
