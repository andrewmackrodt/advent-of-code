const moveRegExp = new RegExp(/^move (?<qty>[0-9]+) from (?<source>[0-9]+) to (?<target>[0-9]+)/)

export function solve(input: string, group = false): string {
    const lines = input.replaceAll(/[ \t]+$/gm, '').split('\n')
    const stacks: string[][] = []
    for (const line of lines) {
        let move
        if (line.includes('[')) {
            const crates = line.replaceAll(/[^A-Z ]/g, '').replaceAll(/ {4}/g, ' ').split(' ')
            for (let i = 0, len = crates.length; i < len; i++) {
                if (stacks.length <= i) {
                    stacks.push([])
                }
                if (crates[i] != '') {
                    stacks[i].unshift(crates[i])
                }
            }
        } else if ((move = moveRegExp.exec(line)) != null) {
            const qty = parseInt(move.groups!.qty)
            const source = parseInt(move.groups!.source) - 1
            const target = parseInt(move.groups!.target) - 1

            if ( ! group) {
                for (let i = 0; i < qty; i++) {
                    if (stacks[source].length === 0) {
                        break
                    }
                    stacks[target].push(stacks[source].pop()!)
                }
            } else {
                stacks[target].push(...stacks[source].splice(-qty))
            }
        }
    }
    return Object.values(stacks).map(stack => stack.pop()).join('')
}

export const partOne = (input: string) => solve(input, false)
export const partTwo = (input: string) => solve(input, true)
