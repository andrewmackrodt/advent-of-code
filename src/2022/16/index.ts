import { PriorityQueue } from '../../utils/PriorityQueue.js'

const valveRegExp = new RegExp(/\b([A-Z]{2})\b.*?\brate=([0-9]+)\b.*?\b([A-Z]{2}(?:, ?[A-Z]{2})*)$/)

interface Valve {
    id: string
    rate: number
    siblings: Record<string, Valve>
}

interface State {
    closed: string[]
    position: string
    pressure: number
    remaining: number
}

interface Evaluation {
    balance: number
    benefit: number
    cost: number
}

class MoveEvaluator {
    protected readonly cache: Record<string, number>
    protected readonly valves: Record<string, Valve>

    public constructor(valves: Record<string, Valve>) {
        this.cache = {}
        this.valves = valves
    }

    public evaluate(origin: Valve, destination: Valve, minutesLeft: number): Evaluation {
        // increase cost by one to account for opening the valve
        const cost = 1 + this.getCost(origin, destination)
        return {
            balance: minutesLeft - cost,
            benefit: destination.rate * Math.max(0, minutesLeft - cost),
            cost,
        }
    }

    protected getCost(origin: Valve, destination: Valve): number {
        if (origin.id === destination.id) {
            return 0
        }

        const key = `${origin.id}:${destination.id}`

        if (key in this.cache) {
            return this.cache[key]
        }

        const queue = new PriorityQueue<[Valve, number]>((a, b) => a < b)
        queue.push([origin, 0])
        const visited: Record<string, number> = { [origin.id]: 0 }

        for (const [node, cost] of queue) {
            // skip the node if it has been visited cheaper
            if (cost > (visited[node.id] ?? Number.MAX_SAFE_INTEGER)) {
                continue
            }

            visited[node.id] = cost

            if (cost > 0) {
                this.cache[`${origin.id}:${node.id}`] = cost
            }

            // break if the destination node is found
            if (node.id === destination.id) {
                break
            }

            // add siblings to queue
            for (const sibling of Object.values(node.siblings)) {
                if (sibling.id !== node.id) {
                    queue.push([sibling, cost + 1])
                }
            }
        }

        return this.cache[key]
    }
}

function parseInput(input: string): Record<string, Valve> {
    const valves: Record<string, Valve> = {}
    const getOrCreateValve = (id: string): Valve => {
        if ( ! (id in valves)) {
            valves[id] = { id, rate: 0, siblings: {} }
        }
        return valves[id]
    }
    for (const line of input.split('\n').filter(line => Boolean(line.length))) {
        const match = valveRegExp.exec(line)
        if ( ! match) throw new Error('Input Error')
        const valve = getOrCreateValve(match[1])
        valve.rate = parseInt(match[2], 10)
        for (const siblingId of match[3].replaceAll(/ /g, '').split(',')) {
            const sibling = getOrCreateValve(siblingId)
            sibling.siblings[valve.id] = valve
            valve.siblings[sibling.id] = sibling
        }
    }
    return valves
}

function getScores(input: string, minutes: number): Record<string, number> {
    const valves = parseInput(input)
    const evaluator = new MoveEvaluator(valves)
    const scores: Record<string, number> = {}
    const queue = new PriorityQueue<State>((a, b) => a.pressure > b.pressure)
    queue.push({ closed: [], position: 'AA', pressure: 0, remaining: minutes })

    for (const state of queue) {
        if (state.remaining === 0) {
            continue
        }

        const key = state.closed.join('|')

        if (key in scores && state.pressure < scores[key]) {
            continue
        }

        scores[key] = state.pressure

        const start = valves[state.position]

        const evaluations = Object.values(valves)
            .filter(destination => (
                destination.id !== start.id &&
                destination.rate > 0 &&
                ! state.closed.includes(destination.id)
            ))
            .reduce(
                (evaluations, destination) => {
                    const evaluation = evaluator.evaluate(start, destination, state.remaining)
                    if (evaluation.benefit > 0) {
                        evaluations[destination.id] = evaluation
                    }
                    return evaluations
                },
                {} as Record<string, Evaluation>)

        for (const [destinationId, evaluation] of Object.entries(evaluations)) {
            if (evaluation.benefit <= 0) {
                continue
            }

            queue.push({
                closed: state.closed.concat(destinationId).sort(),
                position: destinationId,
                pressure: state.pressure + evaluation.benefit,
                remaining: evaluation.balance,
            })
        }
    }

    delete scores['']

    return scores
}

function solve(input: string, minutes: number, concurrency: number): number {
    const scores = Object.entries(getScores(input, minutes))
        .reduce(
            (res, [key, score]) => {
                res.push({ score, key })
                return res
            }, [] as { score: number; key: string }[])
        .sort((a, b) => b.score - a.score)

    let highest = 0

    for (let s1 = 0; s1 < scores.length; s1++) {
        let key = ''
        let score = 0
        for (let c = 0; c < concurrency; c++) {
            for (let s2 = s1 + c; s2 < scores.length; s2++) {
                const scoreKey = scores[s2]
                if ( ! key || ! scoreKey.key.match(key)) {
                    key = key ? `${key}|${scoreKey.key}` : scoreKey.key
                    score += scoreKey.score
                    if (score > highest) {
                        highest = score
                    }
                    break
                }
            }
        }
    }

    return highest
}

export const partOne = (input: string) => solve(input, 30, 1)
export const partTwo = (input: string) => solve(input, 26, 2)
