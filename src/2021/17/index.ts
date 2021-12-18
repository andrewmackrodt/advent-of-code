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

interface VelocityResult extends Velocity {
    maxHeight: number
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

function getVelocities(input: string): VelocityResult[] {
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

    const velocities: VelocityResult[] = []

    for (let y = searchRange.y1; y <= searchRange.y2; y++) {
        // this could be optimized depending on the y value, e.g.
        // if y === searchRange.y1 there is a maximum of one step
        for (let x = searchRange.x1; x <= searchRange.x2; x++) {
            const speed: Velocity = { xSpeed: x, ySpeed: y }
            reset(speed)

            let searchState: SearchState = SearchState.InProgress

            for (let i = 0, maxY = trajectory.y; searchState === SearchState.InProgress; i++) {
                step()
                if (trajectory.y > maxY) maxY = trajectory.y
                if (isInTargetArea()) {
                    searchState = SearchState.Hit
                    velocities.push({ ...speed, ...{ maxHeight: maxY } })
                    break
                }
                if (isBeyondTargetArea()) {
                    searchState = SearchState.Miss
                    break
                }
            }
        }
    }

    return velocities
}

export function getMaxY(input: string): number {
    const velocities = getVelocities(input).sort((a, b) => b.ySpeed - a.ySpeed)

    return velocities[0].maxHeight
}

export function getUniqueValidVelocityCount(input: string): number {
    return getVelocities(input).length
}

export const partOne = (input: string) => getMaxY(input)
export const partTwo = (input: string) => getUniqueValidVelocityCount(input)
