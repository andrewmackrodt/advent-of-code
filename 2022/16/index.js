import { PriorityQueue } from '../../utils/PriorityQueue.js';
const valveRegExp = new RegExp(/\b([A-Z]{2})\b.*?\brate=([0-9]+)\b.*?\b([A-Z]{2}(?:, ?[A-Z]{2})*)$/);
class MoveEvaluator {
    constructor(valves) {
        this.cache = {};
        this.valves = valves;
    }
    evaluate(origin, destination, minutesLeft) {
        // increase cost by one to account for opening the valve
        const cost = 1 + this.getCost(origin, destination);
        return {
            balance: minutesLeft - cost,
            benefit: destination.rate * Math.max(0, minutesLeft - cost),
            cost,
        };
    }
    getCost(origin, destination) {
        if (origin.id === destination.id) {
            return 0;
        }
        const key = `${origin.id}:${destination.id}`;
        if (key in this.cache) {
            return this.cache[key];
        }
        const queue = new PriorityQueue((a, b) => a < b);
        queue.push([origin, 0]);
        const visited = { [origin.id]: 0 };
        for (const [node, cost] of queue) {
            // skip the node if it has been visited cheaper
            if (cost > (visited[node.id] ?? Number.MAX_SAFE_INTEGER)) {
                continue;
            }
            visited[node.id] = cost;
            if (cost > 0) {
                this.cache[`${origin.id}:${node.id}`] = cost;
            }
            // break if the destination node is found
            if (node.id === destination.id) {
                break;
            }
            // add siblings to queue
            for (const sibling of Object.values(node.siblings)) {
                if (sibling.id !== node.id) {
                    queue.push([sibling, cost + 1]);
                }
            }
        }
        return this.cache[key];
    }
}
function parseInput(input) {
    const valves = {};
    const getOrCreateValve = (id) => {
        if (!(id in valves)) {
            valves[id] = { id, rate: 0, siblings: {} };
        }
        return valves[id];
    };
    for (const line of input.split('\n').filter(line => Boolean(line.length))) {
        const match = valveRegExp.exec(line);
        if (!match)
            throw new Error('Input Error');
        const valve = getOrCreateValve(match[1]);
        valve.rate = parseInt(match[2], 10);
        for (const siblingId of match[3].replaceAll(/ /g, '').split(',')) {
            const sibling = getOrCreateValve(siblingId);
            sibling.siblings[valve.id] = valve;
            valve.siblings[sibling.id] = sibling;
        }
    }
    return valves;
}
function solve(input, minutes = 30) {
    const valves = parseInput(input);
    const calculator = new MoveEvaluator(valves);
    const visited = {};
    const queue = new PriorityQueue((a, b) => a.pressure > b.pressure);
    queue.push({ closed: [], position: 'AA', pressure: 0, remaining: minutes });
    let highest = -1;
    for (const state of queue) {
        if (state.pressure > highest) {
            highest = state.pressure;
        }
        if (state.remaining === 0) {
            continue;
        }
        const key = state.closed.join('|');
        if (key in visited && state.pressure < visited[key]) {
            continue;
        }
        visited[key] = state.pressure;
        const start = valves[state.position];
        const evaluations = Object.values(valves)
            .filter(destination => (destination.id !== start.id &&
            destination.rate > 0 &&
            !state.closed.includes(destination.id)))
            .reduce((evaluations, destination) => {
            evaluations[destination.id] = calculator.evaluate(start, destination, state.remaining);
            return evaluations;
        }, {});
        for (const [destinationId, evaluation] of Object.entries(evaluations)) {
            if (evaluation.balance < 0) {
                continue;
            }
            queue.push({
                closed: state.closed.concat(destinationId).sort(),
                position: destinationId,
                pressure: state.pressure + evaluation.benefit,
                remaining: evaluation.balance,
            });
        }
    }
    return highest;
}
export const partOne = (input) => solve(input, 30);
