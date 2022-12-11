function parseInput(input) {
    return input.trim().split('\n')
        .filter(s => s.length > 0)
        .map((line, i) => {
        const operation = line.match(/^(on|off) /)?.[1];
        if (!operation)
            throw new Error(`parse error line ${i + 1}`);
        const extractBound = (axis) => {
            const regExp = new RegExp(`\\b${axis}=(-?[0-9]+)\.\.(-?[0-9]+)`);
            const match = regExp.exec(line);
            if (!match)
                throw new Error(`parse error line ${i + 1}`);
            return { min: parseInt(match[1], 10), max: parseInt(match[2], 10) };
        };
        return {
            operation,
            x: extractBound('x'),
            y: extractBound('y'),
            z: extractBound('z'),
        };
    });
}
function applyLimit(bound, limit) {
    const res = {
        x: {
            min: Math.max(limit.min, bound.x.min),
            max: Math.min(limit.max, bound.x.max),
        },
        y: {
            min: Math.max(limit.min, bound.y.min),
            max: Math.min(limit.max, bound.y.max),
        },
        z: {
            min: Math.max(limit.min, bound.z.min),
            max: Math.min(limit.max, bound.z.max),
        },
    };
    if (res.x.min <= res.x.max &&
        res.y.min <= res.y.max &&
        res.z.min <= res.z.max) {
        return res;
    }
}
function intersect(b1, b2) {
    const inter = {
        x: {
            min: Math.max(b1.x.min, b2.x.min),
            max: Math.min(b1.x.max, b2.x.max),
        },
        y: {
            min: Math.max(b1.y.min, b2.y.min),
            max: Math.min(b1.y.max, b2.y.max),
        },
        z: {
            min: Math.max(b1.z.min, b2.z.min),
            max: Math.min(b1.z.max, b2.z.max),
        },
    };
    if (inter.x.min <= inter.x.max &&
        inter.y.min <= inter.y.max &&
        inter.z.min <= inter.z.max) {
        return inter;
    }
}
export function splitBound(bound, i) {
    const split = [];
    const left = {
        x: { min: bound.x.min, max: i.x.min - 1 },
        y: { min: i.y.min, max: i.y.max },
        z: { min: bound.z.min, max: bound.z.max },
    };
    if (left.x.min <= left.x.max)
        split.push(left);
    const right = {
        x: { min: i.x.max + 1, max: bound.x.max },
        y: { min: i.y.min, max: i.y.max },
        z: { min: bound.z.min, max: bound.z.max },
    };
    if (right.x.min <= right.x.max)
        split.push(right);
    const top = {
        x: { min: bound.x.min, max: bound.x.max },
        y: { min: i.y.max + 1, max: bound.y.max },
        z: { min: bound.z.min, max: bound.z.max },
    };
    if (top.y.min <= top.y.max)
        split.push(top);
    const bottom = {
        x: { min: bound.x.min, max: bound.x.max },
        y: { min: bound.y.min, max: i.y.min - 1 },
        z: { min: bound.z.min, max: bound.z.max },
    };
    if (bottom.y.min <= bottom.y.max)
        split.push(bottom);
    const front = {
        x: { min: i.x.min, max: i.x.max },
        y: { min: i.y.min, max: i.y.max },
        z: { min: bound.z.min, max: i.z.min - 1 },
    };
    if (front.z.min <= front.z.max)
        split.push(front);
    const back = {
        x: { min: i.x.min, max: i.x.max },
        y: { min: i.y.min, max: i.y.max },
        z: { min: i.z.max + 1, max: bound.z.max },
    };
    if (back.z.min <= back.z.max)
        split.push(back);
    for (const s of split) {
        if (intersect(s, i)) {
            throw new Error('logic error');
        }
    }
    return split;
}
function countItems(bound) {
    return (1 + Math.abs(bound.x.max - bound.x.min)) *
        (1 + Math.abs(bound.y.max - bound.y.min)) *
        (1 + Math.abs(bound.z.max - bound.z.min));
}
function solve(input, limit) {
    const enabled = [];
    for (const step of parseInput(input)) {
        const bound = limit ? applyLimit(step, limit) : step;
        if (!bound)
            continue;
        for (let i = 0, len = enabled.length; i < len; i++) {
            const inter = intersect(bound, enabled[i]);
            if (inter) {
                const prev = enabled.splice(i, 1)[0];
                i--;
                len--;
                enabled.push(...splitBound(prev, inter));
            }
        }
        if (step.operation === 'on') {
            enabled.push(bound);
        }
    }
    return enabled.reduce((total, step) => total + countItems(step), 0);
}
export const partOne = (input) => solve(input, { min: -50, max: 50 });
export const partTwo = (input) => solve(input);
