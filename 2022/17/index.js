var Tile;
(function (Tile) {
    Tile["Air"] = ".";
    Tile["Rock"] = "#";
})(Tile || (Tile = {}));
const rocks = [
    { w: 4, h: 1, position: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }] },
    { w: 3, h: 3, position: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }] },
    { w: 3, h: 3, position: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }] },
    { w: 1, h: 4, position: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }] },
    { w: 2, h: 2, position: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
];
const chamberWidth = 7;
const rockStartX = 2;
const rockStartY = 3;
function expandChamber(chamber, minHeight) {
    for (let y = chamber.length - 1; y >= 0 && minHeight > 0; y--) {
        if (chamber[y].find(tile => tile !== Tile.Air)) {
            break;
        }
        minHeight--;
    }
    for (let i = 0; i < minHeight; i++) {
        chamber.push(new Array(chamberWidth).fill(Tile.Air));
    }
}
function addRock(chamber, rockIndex) {
    const rock = {
        w: rocks[rockIndex].w,
        h: rocks[rockIndex].h,
        position: [],
    };
    const minHeight = rock.h + rockStartY;
    expandChamber(chamber, minHeight);
    const top = chamber.length - 1;
    for (let { x, y } of rocks[rockIndex].position) {
        x += rockStartX;
        y = top - y;
        rock.position.push({ x, y });
        chamber[y][x] = Tile.Air;
    }
    return rock;
}
function moveRock(chamber, rock, direction) {
    const dx = direction === '>' ? 1 : -1;
    let canMoveHorizontal = true;
    for (const { x, y } of rock.position) {
        const nx = dx + x;
        if (!(0 <= nx && nx < chamberWidth && chamber[y][nx] === Tile.Air)) {
            canMoveHorizontal = false;
            break;
        }
    }
    if (canMoveHorizontal) {
        for (const point of rock.position) {
            point.x += dx;
        }
    }
    let canMoveDown = true;
    for (const { x, y } of rock.position) {
        const ny = y - 1;
        if (!(0 <= ny && chamber[ny][x] === Tile.Air)) {
            canMoveDown = false;
            break;
        }
    }
    if (canMoveDown) {
        for (const point of rock.position) {
            point.y--;
        }
        if (!chamber[chamber.length - 1].find(tile => tile !== Tile.Air)) {
            chamber.splice(chamber.length - 1);
        }
    }
    return canMoveDown;
}
function solve(input, steps, patternRepeatThreshold = 1750) {
    const chamber = [];
    const directions = input.replaceAll(/[^<>]/g, '');
    const deltas = [];
    let lastHeight = 0;
    let rockIndex = 0;
    let directionIndex = 0;
    for (let step = 0; step < steps; step++) {
        const rock = addRock(chamber, rockIndex++);
        if (rockIndex >= rocks.length)
            rockIndex = 0;
        while (true) {
            const direction = directions[directionIndex++];
            if (directionIndex >= directions.length)
                directionIndex = 0;
            if (!moveRock(chamber, rock, direction)) {
                for (const { x, y } of rock.position) {
                    chamber[y][x] = Tile.Rock;
                }
                break;
            }
        }
        const delta = chamber.length - lastHeight;
        deltas.push(delta);
        lastHeight = chamber.length;
        if (step >= (2 * patternRepeatThreshold) - 1) {
            const search = deltas.slice(0, deltas.length - patternRepeatThreshold).join('');
            const hash = deltas.slice(deltas.length - patternRepeatThreshold).join('');
            const repeatStep = search.lastIndexOf(hash);
            if (repeatStep >= 0) {
                const repeatLength = step - patternRepeatThreshold - repeatStep + 1;
                if (repeatLength > patternRepeatThreshold) {
                    console.warn(`Increasing pattern repeat threshold: ${repeatLength}`);
                    patternRepeatThreshold = repeatLength;
                    continue;
                }
                const repeatDeltas = deltas.slice(repeatStep, repeatStep + repeatLength);
                const stepsLeft = steps - repeatStep;
                const mul = Math.floor(stepsLeft / repeatLength);
                const rem = stepsLeft % repeatLength;
                return deltas.slice(0, repeatStep).reduce((total, delta) => total + delta, 0)
                    + (mul * repeatDeltas.reduce((total, delta) => total + delta, 0))
                    + repeatDeltas.slice(0, rem).reduce((total, delta) => total + delta, 0);
            }
        }
    }
    return chamber.length;
}
export const partOne = (input) => solve(input, 2022);
export const partTwo = (input) => solve(input, 1000000000000);
