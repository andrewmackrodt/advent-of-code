interface Operation {
    op: '+' | '-' | '*' | '/'
    a: Monkey
    b: Monkey
}

class Monkey {
    public constructor(
        public value: number | Operation,
    ) {
    }

    public calculate(): number {
        if (typeof this.value === 'number') {
            return this.value
        }
        const a = this.value.a.calculate()
        const b = this.value.b.calculate()
        switch (this.value.op) {
            case '*': return a * b
            case '/': return a / b
            case '+': return a + b
            case '-': return a - b
        }
    }
}

const inputRegExp = new RegExp('([a-z]+): (?:(-?[0-9]+)|([a-z]+) ([*/+-]) ([a-z]+))')

function parseInput(input: string): Monkey {
    const monkeys: Record<string, Monkey> = {}
    const getOrCreateMonkey = (name: string): Monkey => {
        if (name in monkeys) {
            return monkeys[name]
        }
        const monkey = new Monkey(0)
        monkeys[name] = monkey
        return monkey
    }
    input.split('\n')
        .map(line => inputRegExp.exec(line))
        .forEach(match => {
            if ( ! match) return
            const monkey = getOrCreateMonkey(match[1])
            if (match[2]) {
                monkey.value = parseInt(match[2], 10)
            } else {
                monkey.value = {
                    op: match[4] as any,
                    a: getOrCreateMonkey(match[3]),
                    b: getOrCreateMonkey(match[5]),
                }
            }
        })
    return monkeys.root
}

export const partOne = (input: string) => parseInput(input).calculate()
