import { PriorityQueue } from '../../utils/PriorityQueue.js';
const valveRegExp = new RegExp(/\b([A-Z]{2})\b.*?\brate=([0-9]+)\b.*?\b([A-Z]{2}(?:, ?[A-Z]{2})*)$/);
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
export function partOne(input) {
    const valves = parseInput(input);
    const maxOpenCount = Object.values(valves).filter(valve => Boolean(valve.rate)).length;
    const queue = new PriorityQueue((a, b) => a.minute < b.minute);
    let highest = -1;
    queue.push({
        action: 'initial',
        history: [],
        minute: 0,
        open: [],
        position: 'AA',
        ppm: 0,
        total: 0,
    });
    const visited = {};
    for (const state of queue) {
        if (state.minute === 30) {
            if (state.total > highest) {
                highest = state.total;
            }
            continue;
        }
        const valve = valves[state.position];
        let open = state.open;
        let ppm = state.ppm;
        let total = state.total + ppm;
        if (state.action === 'open') {
            ppm += valve.rate;
            total += valve.rate;
            open = open.concat(state.position).sort();
        }
        const nextState = {
            action: 'wait',
            history: state.history.concat(state),
            minute: state.minute + 1,
            open,
            position: state.position,
            ppm, total,
        };
        const key = `${nextState.minute}:${nextState.position}:[${nextState.open.join(',')}]`;
        // skip path if we have visited the edge in the same minute previously and the same valves were open
        if (key in visited && visited[key] >= nextState.total) {
            continue;
        }
        visited[key] = nextState.total;
        // if all valves are open calculate maximum value
        if (nextState.open.length === maxOpenCount) {
            const rem = 30 - nextState.minute;
            const total = nextState.total + (rem * nextState.ppm);
            if (total > highest) {
                highest = total;
            }
            continue;
        }
        const nextStates = [];
        // open valve at current position not already open and rate > 0
        if (!(nextState.open.includes(state.position)) && valve.rate > 0) {
            nextStates.push({
                action: 'open',
                history: nextState.history,
                minute: nextState.minute,
                open: nextState.open,
                position: nextState.position,
                ppm: nextState.ppm,
                total: nextState.total,
            });
        }
        for (const sibling of Object.values(valve.siblings)) {
            // don't traverse to previous valves if we've moved from them and not opened anything
            let isVisited = false;
            if (state.action === 'move') {
                for (let i = state.history.length - 1; i >= 0 && state.history[i].action === 'move'; i--) {
                    if (state.history[i].position === sibling.id) {
                        isVisited = true;
                        break;
                    }
                }
            }
            if (!isVisited) {
                nextStates.push({
                    action: 'move',
                    history: nextState.history,
                    minute: nextState.minute,
                    open: nextState.open,
                    position: sibling.id,
                    ppm: nextState.ppm,
                    total: nextState.total,
                });
            }
        }
        for (const nextState of nextStates) {
            queue.push(nextState);
        }
    }
    return highest;
}
