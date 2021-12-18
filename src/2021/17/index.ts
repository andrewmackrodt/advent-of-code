interface PointArea {
    x1: number
    x2: number
    y1: number
    y2: number
}

interface Point {
    x: number
    y: number
}

interface Velocity {
    xSpeed: number
    ySpeed: number
}

enum SearchState {
    InProgress,
    Hit,
    Miss,
}

type Trajectory = Point & Velocity

function parseInput(input: string): PointArea {
    return input.replace(/ /g, '')
        .replace(/[^:]+:/, '')
        .split(',')
        .reduce((area, str) => {
            const [k, v1, v2] = str.split(/[=.]+/)
            area[`${k}1`] = parseInt(v1, 10)
            area[`${k}2`] = parseInt(v2, 10)
            return area
        }, {} as Record<string, number>) as any
}

function factorial(n: number): number {
    return n > 1 ? n + factorial(n - 1) : n
}

export function getMaxY(input: string): number {
    const targetArea = parseInput(input)

    // when y1 === -10, highest y velocity === 45, i.e. 9!
    return factorial((targetArea.y1 * -1) - 1)
}

export function getUniqueValidVelocityCount(input: string): number {
    const targetArea = parseInput(input)

    const searchRange: PointArea = {
        x1: 0,
        x2: targetArea.x2,
        y1: targetArea.y1,
        y2: (targetArea.y1 * -1) - 1,
    }

    const trajectory: Trajectory = {
        x: 0,
        y: 0,
        xSpeed: 0,
        ySpeed: 0,
    }

    const reset = (initialSpeed: Velocity) => {
        trajectory.x = 0
        trajectory.y = 0
        trajectory.xSpeed = initialSpeed.xSpeed
        trajectory.ySpeed = initialSpeed.ySpeed
    }

    const step = () => {
        trajectory.x += trajectory.xSpeed
        trajectory.y += trajectory.ySpeed
        if (trajectory.xSpeed > 0) trajectory.xSpeed--
        else if (trajectory.xSpeed < 0) trajectory.xSpeed++
        trajectory.ySpeed--
    }

    const isInTargetArea = () => (
        targetArea.x1 <= trajectory.x &&
        trajectory.x <= targetArea.x2 &&
        targetArea.y1 <= trajectory.y &&
        trajectory.y <= targetArea.y2
    )

    const isBeyondTargetArea = () => trajectory.x > targetArea.x2 || trajectory.y < targetArea.y1

    const valid: Velocity[] = []

    for (let y = searchRange.y1; y <= searchRange.y2; y++) {
        // this could be optimized depending on the y value, e.g.
        // if y === searchRange.y1 there is a maximum of one step
        for (let x = searchRange.x1; x <= searchRange.x2; x++) {
            const speed: Velocity = { xSpeed: x, ySpeed: y }
            reset(speed)

            let searchState: SearchState = SearchState.InProgress

            for (let i = 0; searchState === SearchState.InProgress; i++) {
                step()
                if (isInTargetArea()) {
                    searchState = SearchState.Hit
                    break
                }
                if (isBeyondTargetArea()) {
                    searchState = SearchState.Miss
                    break
                }
            }

            if (searchState === SearchState.Hit) {
                valid.push(speed)
            }
        }
    }

    return valid.length
}

export const partOne = (input: string) => getMaxY(input)
export const partTwo = (input: string) => getUniqueValidVelocityCount(input)
