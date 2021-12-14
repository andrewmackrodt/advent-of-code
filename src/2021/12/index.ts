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

class PathFinder {
    private routes: Path[][] = []

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }

    public static getRoutes(input: string): Path[][] {
        const start = PathBuilder.getStart(input)

        return new this().traverse(start, [])
    }

    private traverse(path: Path, route: Path[]): Path[][] {
        route = [...route, path]
        if (path.name !== 'end') {
            const traversable = path.siblings.filter(s => ! s.isSmall || ! route.includes(s))
            for (const sibling of traversable) {
                this.traverse(sibling, route)
            }
        } else {
            this.routes.push(route)
        }
        return this.routes
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

export function solve(input: string): number {
    const routes = PathFinder.getRoutes(input)

    return routes.length
}
