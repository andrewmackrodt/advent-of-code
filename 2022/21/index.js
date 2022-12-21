class Monkey {
    constructor(value) {
        this.value = value;
    }
    calculate() {
        if (typeof this.value === 'number') {
            return this.value;
        }
        const a = this.value.a.calculate();
        const b = this.value.b.calculate();
        switch (this.value.op) {
            case '*': return a * b;
            case '/': return a / b;
            case '+': return a + b;
            case '-': return a - b;
        }
    }
}
const inputRegExp = new RegExp('([a-z]+): (?:(-?[0-9]+)|([a-z]+) ([*/+-]) ([a-z]+))');
function parseInput(input) {
    const monkeys = {};
    const getOrCreateMonkey = (name) => {
        if (name in monkeys) {
            return monkeys[name];
        }
        const monkey = new Monkey(0);
        monkeys[name] = monkey;
        return monkey;
    };
    input.split('\n')
        .map(line => inputRegExp.exec(line))
        .forEach(match => {
        if (!match)
            return;
        const monkey = getOrCreateMonkey(match[1]);
        if (match[2]) {
            monkey.value = parseInt(match[2], 10);
        }
        else {
            monkey.value = {
                op: match[4],
                a: getOrCreateMonkey(match[3]),
                b: getOrCreateMonkey(match[5]),
            };
        }
    });
    return monkeys;
}
export const partOne = (input) => parseInput(input).root.calculate();
export const partTwo = (input) => {
    const monkeys = parseInput(input);
    const humn = monkeys.humn;
    const root = monkeys.root;
    const op = root.value;
    op.op = '-';
    let delta = 1000;
    let allowDeltaIncrease = true;
    let increase = true;
    let last = 0;
    while (true) {
        const diff = root.calculate();
        if (diff === 0) {
            return humn.value;
        }
        // if sign has flipped between last diff and current, decrease delta and flip add/subtract
        if ((last < 0 && 0 < diff) || diff < 0 && 0 < last) {
            delta = Math.round(delta / 2);
            increase = !increase;
            allowDeltaIncrease = false;
        }
        if (increase) {
            humn.value = humn.value + delta;
        }
        else {
            humn.value = humn.value - delta;
        }
        if (allowDeltaIncrease) {
            delta *= 2;
        }
        last = diff;
    }
};
