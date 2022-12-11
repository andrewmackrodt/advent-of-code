const ROOM_TARGETS = ['A', 'B', 'C', 'D'];
const ROOM_COUNT = ROOM_TARGETS.length;
const ROOM_ENTRANCES = ROOM_TARGETS.map((_, i) => 2 + (2 * i));
const HALL_SIZE = 3 + 2 * ROOM_COUNT;
const ENERGY = ROOM_TARGETS.reduce((res, a, i) => {
    res[a] = Math.pow(10, i);
    return res;
}, {});
function repeat(pattern, times) {
    return new Array(times).fill(pattern).join('');
}
class Organizer {
    constructor(state, endState, roomSize, cache, steps = [], energy = 0) {
        this.state = state;
        this.endState = endState;
        this.roomSize = roomSize;
        this.cache = cache;
        this.energy = energy;
        this.steps = steps;
    }
    static organize(input) {
        const amphipods = input.replace(/[^A-D]/g, '');
        if (amphipods.length === 0 || (amphipods.length % ROOM_COUNT) !== 0) {
            throw new Error('invalid input');
        }
        const initialState = new Array(HALL_SIZE).fill('.').concat(amphipods.split(''));
        const roomSize = amphipods.length / ROOM_COUNT;
        const endState = repeat('.', HALL_SIZE) + repeat(ROOM_TARGETS.join(''), roomSize);
        const cache = { [endState]: Number.MAX_SAFE_INTEGER };
        const organizer = new Organizer(initialState, endState, roomSize, cache);
        const queue = [];
        queue.push([organizer, 0]);
        let best = { energy: Number.MAX_SAFE_INTEGER, steps: [] };
        for (const [organizer, energy] of queue) {
            const strState = organizer.state.join('');
            organizer.steps.push([strState, energy]);
            if (strState === endState) {
                if (process?.env.DEBUG) {
                    process.stdout.write(`found solution requiring ${organizer.steps.length} steps and ${energy} energy\n`);
                }
                if (energy < best.energy) {
                    best = {
                        energy: organizer.energy,
                        steps: organizer.steps,
                    };
                    continue;
                }
            }
            organizer.traverse(queue);
        }
        if (best.steps.length === 0) {
            throw new Error('no solution found');
        }
        return best;
    }
    traverse(queue) {
        for (let from = 0; from < this.state.length; from++) {
            if (this.state[from] === '.') {
                continue;
            }
            const amphipod = this.state[from];
            for (const [to, steps] of this.getSteps(amphipod, from)) {
                const nextState = this.state.concat();
                nextState[to] = nextState[from];
                nextState[from] = '.';
                const key = nextState.join('');
                const stepEnergy = steps * ENERGY[amphipod];
                const nextEnergy = this.energy + stepEnergy;
                if (nextEnergy >= this.cache[key] ||
                    nextEnergy >= this.cache[this.endState]) {
                    continue;
                }
                this.cache[key] = nextEnergy;
                const next = new Organizer(nextState, this.endState, this.roomSize, this.cache, this.steps.concat(), nextEnergy);
                queue.push([next, nextEnergy]);
            }
        }
    }
    isRoomDone(amphipod) {
        const room = ROOM_TARGETS.indexOf(amphipod);
        for (let y = 0, i = HALL_SIZE + room; y < this.roomSize; y++, i += ROOM_COUNT) {
            if (this.state[i] !== ROOM_TARGETS[room]) {
                return false;
            }
        }
        return true;
    }
    canMoveTo(from, to) {
        let steps = 0;
        const originalFrom = from;
        // try to move to hallway if moving from a room
        if (from >= HALL_SIZE) {
            const room = (from - HALL_SIZE) % ROOM_COUNT;
            from -= ROOM_COUNT;
            steps++;
            while (from >= HALL_SIZE) {
                if (this.state[from] !== '.') {
                    return;
                }
                from -= ROOM_COUNT;
                steps++;
            }
            from = ROOM_ENTRANCES[room];
        }
        // see if destination room entrance is blocked
        if (to >= HALL_SIZE) {
            const room = (to - HALL_SIZE) % ROOM_COUNT;
            const entrance = ROOM_ENTRANCES[room];
            const stepsToHall = this.canMoveTo(to, entrance);
            if (typeof stepsToHall !== 'number') {
                return;
            }
            to = entrance;
            steps += stepsToHall;
        }
        for (let i = Math.min(from, to), j = Math.max(from, to); i < j; i++) {
            if (i !== originalFrom && this.state[i] !== '.') {
                return;
            }
            steps++;
        }
        return steps;
    }
    tryGetTarget(amphipod) {
        const room = ROOM_TARGETS.indexOf(amphipod);
        for (let y = 0, pos = this.state.length - ROOM_COUNT + room; y < this.roomSize; y++, pos -= ROOM_COUNT) {
            if (this.state[pos] === '.') {
                return pos;
            }
            else if (this.state[pos] !== amphipod) {
                return;
            }
        }
    }
    getHallSteps(pos) {
        if (pos !== 0 && pos >= HALL_SIZE) {
            throw new Error('not in hall');
        }
        const moves = [];
        // move left
        for (let x = pos - 1, steps = 1; this.state[x] === '.' && x >= 0; x--, steps++) {
            if (!ROOM_ENTRANCES.includes(x)) {
                moves.push([x, steps]);
            }
        }
        // move right
        for (let x = pos + 1, steps = 1; this.state[x] === '.' && x < HALL_SIZE; x++, steps++) {
            if (!ROOM_ENTRANCES.includes(x)) {
                moves.push([x, steps]);
            }
        }
        return moves;
    }
    getSteps(amphipod, pos) {
        const startedInHall = pos < HALL_SIZE;
        let steps = 0;
        if (!startedInHall) {
            // no moves if all amphipods of type are in the correct room
            if (this.isRoomDone(amphipod)) {
                return [];
            }
            const room = (pos - HALL_SIZE) % ROOM_COUNT;
            const entrance = ROOM_ENTRANCES[room];
            // no moves if the amphipod cannot move to the entrance
            const stepsToEntrance = this.canMoveTo(pos, entrance);
            if (typeof stepsToEntrance !== 'number') {
                return [];
            }
            // continue search from the entrance
            pos = entrance;
            steps += stepsToEntrance;
        }
        // move amphipod to the destination room if path is empty
        // and all room criteria are met, i.e. from bottom to top
        // all amphipods are of the same time or the tile is empty
        const target = this.tryGetTarget(amphipod);
        if (typeof target === 'number') {
            const stepsToTarget = this.canMoveTo(pos, target);
            if (typeof stepsToTarget === 'number') {
                steps += stepsToTarget;
                return [[target, steps]];
            }
        }
        // amphipod cannot move to another position in the hall
        // and it is unable to go to the destination room
        if (startedInHall) {
            return [];
        }
        // else return all eligible hall positions and the energy cost
        return this.getHallSteps(pos).map(([pos, posSteps]) => [pos, posSteps + steps]);
    }
}
export function partOne(input) {
    const { energy, steps } = Organizer.organize(input);
    const print = ([state, energy]) => {
        let str = new Array(HALL_SIZE + 2).fill('#').join('') + '\n';
        str += '#' + state.slice(0, HALL_SIZE) + '#\n';
        for (let i = HALL_SIZE; i < state.length; i += ROOM_COUNT) {
            if (i === HALL_SIZE) {
                str += '###' + state.slice(i, i + ROOM_COUNT).split('').join('#') + '###\n';
            }
            else {
                str += '  #' + state.slice(i, i + ROOM_COUNT).split('').join('#') + '#  \n';
            }
        }
        str += `  ${new Array(HALL_SIZE - 2).fill('#').join('')}  \n`;
        process.stdout.write(`${str}\n${state}\t${energy}\n\n`);
    };
    if (process?.env.DEBUG) {
        steps.map(print);
    }
    return energy;
}
export function partTwo(input) {
    const newInput = input.replace(/[^A-D]/g, '').replace(/^([A-D]{4})/, '$1DCBADBAC');
    return partOne(newInput);
}
