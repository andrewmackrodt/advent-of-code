class PathBuilder {
    constructor(input) {
        this.paths = {};
        for (const pathNames of input.split('\n').map(s => s.split('-'))) {
            const p1 = this.getOrCreatePath(pathNames[0]);
            const p2 = this.getOrCreatePath(pathNames[1]);
            this.connectPath(p1, p2);
        }
    }
    static getStart(input) {
        return new this(input).paths.start;
    }
    getOrCreatePath(name) {
        if (!(name in this.paths)) {
            this.paths[name] = new Path(name);
        }
        return this.paths[name];
    }
    connectPath(p1, p2) {
        p1.siblings.push(p2);
        p2.siblings.push(p1);
    }
}
class PathFinder {
    constructor(allowOnceSingleSmallCaveRevisit = false) {
        this.allowOnceSingleSmallCaveRevisit = allowOnceSingleSmallCaveRevisit;
        this.routes = [];
    }
    static getRoutes(input, allowOnceSingleSmallCaveRevisit = false) {
        const start = PathBuilder.getStart(input);
        return new this(allowOnceSingleSmallCaveRevisit).traverse(start, []);
    }
    traverse(path, route) {
        route = [...route, path];
        if (path.name !== 'end') {
            const traversable = path.siblings.filter(s => (!s.isSmall ||
                !route.includes(s) ||
                (this.allowOnceSingleSmallCaveRevisit &&
                    s.name !== 'start' &&
                    PathFinder.canRevisitSmallCave(route))));
            for (const sibling of traversable) {
                this.traverse(sibling, route);
            }
        }
        else {
            this.routes.push(route);
        }
        return this.routes;
    }
    static canRevisitSmallCave(route) {
        return Object.values(PathFinder.getVisitedSmallCaves(route))
            .map(n => n.visit)
            .filter(p => p > 1).length === 0;
    }
    static getVisitedSmallCaves(route) {
        return route
            .filter(p => (p.name[0].toLowerCase() === p.name[0] &&
            p.name !== 'start' &&
            p.name !== 'end'))
            .reduce((res, path) => {
            if (!(path.name in res)) {
                res[path.name] = { path, visit: 0 };
            }
            res[path.name].visit++;
            return res;
        }, {});
    }
}
class Path {
    constructor(name) {
        this.name = name;
        this.siblings = [];
    }
    get isSmall() {
        return this.name[0].toLowerCase() === this.name[0];
    }
}
export function solve(input, allowOnceSingleSmallCaveRevisit = false) {
    const routes = PathFinder.getRoutes(input, allowOnceSingleSmallCaveRevisit);
    return routes.length;
}
export const partOne = (input) => solve(input);
export const partTwo = (input) => solve(input, true);
