class PathBuilder {
    private readonly paths: Record<string, Path> = {}

    private constructor(input: string) {
        for (const pathNames of input.split('\n').map(s => s.split('-'))) {
            const p1 = this.getOrCreatePath(pathNames[0])
            const p2 = this.getOrCreatePath(pathNames[1])
            this.connectPath(p1, p2)
        }
    }

    public static getStart(input: string): Path {
        return new this(input).paths.start
    }

    private getOrCreatePath(name: string): Path {
        if ( ! (name in this.paths)) {
            this.paths[name] = new Path(name)
        }
        return this.paths[name]
    }

    private connectPath(p1: Path, p2: Path) {
        p1.siblings.push(p2)
        p2.siblings.push(p1)
    }
}

type PathVisitRecord = Record<string, { path: Path; visit: number }>

class PathFinder {
    private routes: Path[][] = []

    private constructor(
        private readonly allowOnceSingleSmallCaveRevisit = false,
    ) {
    }

    public static getRoutes(input: string, allowOnceSingleSmallCaveRevisit = false): Path[][] {
        const start = PathBuilder.getStart(input)

        return new this(allowOnceSingleSmallCaveRevisit).traverse(start, [])
    }

    private traverse(path: Path, route: Path[]): Path[][] {
        route = [...route, path]
        if (path.name !== 'end') {
            const traversable = path.siblings.filter(s => (
                ! s.isSmall ||
                ! route.includes(s) ||
                (this.allowOnceSingleSmallCaveRevisit &&
                    s.name !== 'start' &&
                    PathFinder.canRevisitSmallCave(route)
                )
            ))
            for (const sibling of traversable) {
                this.traverse(sibling, route)
            }
        } else {
            this.routes.push(route)
        }
        return this.routes
    }

    private static canRevisitSmallCave(route: Path[]): boolean {
        return Object.values(PathFinder.getVisitedSmallCaves(route))
            .map(n => n.visit)
            .filter(p => p > 1).length === 0
    }

    private static getVisitedSmallCaves(route: Path[]): PathVisitRecord {
        return route
            .filter(p => (
                p.name[0].toLowerCase() === p.name[0] &&
                p.name !== 'start' &&
                p.name !== 'end'
            ))
            .reduce((res, path) => {
                if ( ! (path.name in res)) {
                    res[path.name] = { path, visit: 0 }
                }
                res[path.name].visit++
                return res
            }, {} as PathVisitRecord)
    }
}

class Path {
    public readonly siblings: Path[] = []

    public constructor(
        public readonly name: string,
    ) {
    }

    public get isSmall(): boolean {
        return this.name[0].toLowerCase() === this.name[0]
    }
}

export function solve(
    input: string,
    allowOnceSingleSmallCaveRevisit = false,
): number {
    const routes = PathFinder.getRoutes(input, allowOnceSingleSmallCaveRevisit)

    return routes.length
}

export const partOne = (input: string) => solve(input)
export const partTwo = (input: string) => solve(input, true)
