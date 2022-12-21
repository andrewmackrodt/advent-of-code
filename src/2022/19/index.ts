import { PriorityQueue } from '../../utils/PriorityQueue.js'

type Material = 'clay' | 'geode' | 'obsidian' | 'ore'

type Cost = Partial<Record<Material, number>>

interface Robot {
    type: Material
    cost: Cost
}

type Robots = Partial<Record<Material, Robot>>

interface Blueprint {
    id: number
    robots: Robots
}

interface State {
    materials: Partial<Record<Material, number>>
    minute: number
    robots: Partial<Record<Material, number>>
    score: number
    previous?: State
}

function copyState(state: State): State {
    return {
        materials: Object.assign({}, state.materials),
        minute: state.minute,
        robots: Object.assign({}, state.robots),
        score: state.score,
        previous: state,
    }
}

function parseInput(input: string): Blueprint[] {
    return input.replace(/^\s+|\s+$/, '')
        .replaceAll(/\n/g, ' ')
        .replaceAll(/ {2,}/g, ' ')
        .replaceAll(/ ?\b(Blueprint)/gi, '\n$1')
        .split('\n')
        .filter(line => line.match(/Blueprint [0-9]+/i))
        .reduce((blueprints, line) => {
            const id = parseInt(line.match(/Blueprint ([0-9]+)/i)![1], 10)
            const robots: Robots = {}
            for (const robot of line.split(/Each/i).filter(line => line.includes('costs'))) {
                const type = robot.match(/([a-z]+) robot/)?.[1] as Material | undefined
                const cost: Cost = {}
                if ( ! type) continue
                for (const match of [...robot.matchAll(/([0-9]+) ([a-z]+)/g)]) {
                    cost[match[2] as Material] = parseInt(match[1], 10)
                }
                robots[type] = { type, cost }
            }
            blueprints.push({ id, robots })
            return blueprints
        }, [] as Blueprint[])
}

function execBlueprint(blueprint: Blueprint, minutes: number): State {
    const queue = new PriorityQueue<State>((a, b) => a.score < b.score || a.minute < b.minute)
    queue.push({ materials: {}, minute: 0, robots: { ore: 1 }, score: 0 })

    let bestState: State | undefined

    const visited: Record<number, number> = {}

    for (const initialState of queue) {
        if ( ! bestState || initialState.score > bestState.score) {
            bestState = initialState
        }

        if (initialState.minute === minutes) {
            break
        }

        if (initialState.minute in visited && initialState.score < visited[initialState.minute]) {
            continue
        }

        visited[initialState.minute] = initialState.score

        for (const robot of Object.values(blueprint.robots)) {
            let canBuildRobot = true
            const state = copyState(initialState)
            state.minute++
            for (const [material, required] of Object.entries(robot.cost) as [Material, number][]) {
                state.materials[material] = (state.materials[material] ?? 0) - required
                if (state.materials[material]! < 0) {
                    canBuildRobot = false
                    break
                }
            }
            if (canBuildRobot) {
                if ( ! (robot.type in state.robots)) {
                    state.robots[robot.type] = 0
                }
                state.robots[robot.type]!++
                if (robot.type === 'geode') {
                    state.score += (minutes - state.minute)
                }
                queue.push(state)
            }
        }

        const nextState = copyState(initialState)
        nextState.minute++

        // increase materials based on available robots
        for (const [material, count] of Object.entries(initialState.robots) as [Material, number][]) {
            if ( ! (material in nextState.materials)) {
                nextState.materials[material] = 0
            }
            nextState.materials[material]! += count
        }

        queue.push(nextState)
    }

    if ( ! bestState) {
        throw new Error()
    }

    return bestState
}

function solve(input: string, minutes = 24): number {
    const blueprints = parseInput(input)
    for (const blueprint of blueprints) {
        const best = execBlueprint(blueprint, minutes)
        console.log(best)
    }

    return NaN
}

export const partOne = (input: string) => solve(input)
