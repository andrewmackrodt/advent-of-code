export type TreeArray<T> = [T | TreeArray<T>, T | TreeArray<T>]

type TreeBranchNode<T> = Tree<T> | TreeValueNode<T>

interface TreeValueNode<T> {
    readonly parent: Tree<T>
    value: T
}

const isValueNode = <T>(branch: TreeBranchNode<T>): branch is TreeValueNode<T> => {
    return 'value' in branch
}

const isLeft = <T>(node: Tree<T>): boolean => node.parent?.left === node
const isRight = <T>(node: Tree<T>): boolean => node.parent?.right === node

export class Tree<T> {
    public parent?: this
    public left!: TreeBranchNode<T>
    public right!: TreeBranchNode<T>

    public static createFromArray<T>(array: TreeArray<T>, parent?: Tree<T>): Tree<T> {
        if (array.length !== 2) {
            throw new Error('error parsing input')
        }

        const instance = new this<T>()
        instance.parent = parent

        // left
        if (Array.isArray(array[0])) {
            instance.left = Tree.createFromArray<T>(array[0], instance)
        } else {
            instance.left = { parent: instance, value: array[0] }
        }

        // right
        if (Array.isArray(array[1])) {
            instance.right = Tree.createFromArray<T>(array[1], instance)
        } else {
            instance.right = { parent: instance, value: array[1] }
        }

        return instance
    }

    public findLeft(): TreeValueNode<T> | undefined {
        if ( ! this.parent) return
        if (isRight(this)) {
            if (isValueNode(this.parent.left)) {
                return this.parent.left
            } else {
                const findFirstRightValue = (node: Tree<T>): TreeValueNode<T> | undefined => {
                    return (isValueNode(node.right) ? node.right : undefined)
                        ?? findFirstRightValue(node.right as any)
                        // todo can a regular number be on the left?
                        // ?? (isValueNode(node.left) ? node.left : undefined)
                        // ?? findFirstRightValue(node.left as any)
                }
                return findFirstRightValue(this.parent.left)
            }
        }
        else {
            return this.parent.findLeft()
        }
    }

    public findRight(): TreeValueNode<T> | undefined {
        if ( ! this.parent) return
        if (isLeft(this)) {
            if (isValueNode(this.parent.right)) {
                return this.parent.right
            } else {
                const findFirstLeftValue = (node: Tree<T>): TreeValueNode<T> | undefined => {
                    return (isValueNode(node.left) ? node.left : undefined)
                        ?? findFirstLeftValue(node.left as any)
                        // todo can a regular number be on the right?
                        // ?? (isValueNode(node.right) ? node.right : undefined)
                        // ?? findFirstLeftValue(node.right as any)
                }
                return findFirstLeftValue(this.parent.right)
            }
        }
        else {
            return this.parent.findRight()
        }
    }

    public toArray(): TreeArray<T> {
        const toObject = (tree: Tree<T>): TreeArray<T> => {
            return [
                isValueNode(tree.left)  ? tree.left.value  : toObject(tree.left),
                isValueNode(tree.right) ? tree.right.value : toObject(tree.right),
            ]
        }

        return toObject(this)
    }
}

export abstract class SnailfishUtils {
    public static merge(one: Tree<number>, two: Tree<number>): Tree<number> {
        const result = new Tree<number>()
        result.left = one
        one.parent = result
        result.right = two
        two.parent = result
        return result
    }

    public static explode(node: Tree<number>, depth = 1): boolean {
        // recursively explore tree
        if (depth <= 4) {
            if ( ! isValueNode(node.left)) {
                if (SnailfishUtils.explode(node.left, depth + 1)) {
                    return true
                }
            }
            if ( ! isValueNode(node.right)) {
                if (SnailfishUtils.explode(node.right, depth + 1)) {
                    return true
                }
            }
            return false
        }

        // perform explode action once deep enough
        if ( ! node.parent) {
            throw new Error('parent is empty')
        }

        if ( ! isValueNode(node.left) || ! isValueNode(node.right)) {
            throw new Error(`invalid input: [${depth}]: ${node.toArray()}`)
        }

        const outerLeft = node.findLeft()
        if (outerLeft) {
            outerLeft.value += node.left.value
        }

        const outerRight = node.findRight()
        if (outerRight) {
            outerRight.value += node.right.value
        }

        if (isLeft(node)) {
            node.parent.left = { parent: node.parent, value: 0 }
        }
        else {
            node.parent.right = { parent: node.parent, value: 0 }
        }

        return true
    }

    public static split(node: Tree<number>): boolean {
        // left
        if ( ! isValueNode(node.left)) {
            if (SnailfishUtils.split(node.left)) {
                return true
            }
        }
        else if (node.left.value >= 10) {
            const min = Math.floor(node.left.value / 2)
            const max = Math.ceil(node.left.value / 2)
            node.left = Tree.createFromArray([min, max], node)
            return true
        }

        // right
        if ( ! isValueNode(node.right)) {
            if (SnailfishUtils.split(node.right)) {
                return true
            }
        }
        else if (node.right.value >= 10) {
            const min = Math.floor(node.right.value / 2)
            const max = Math.ceil(node.right.value / 2)
            node.right = Tree.createFromArray([min, max], node)
            return true
        }

        return false
    }

    public static reduce(node: Tree<number>): void {
        while (true) {
            // todo is this supposed to be done in sequence?
            // e.g. explode, split, explode, split etc ..
            while (SnailfishUtils.explode(node));
            if ( ! SnailfishUtils.split(node)) {
                break
            }
        }
    }

    public static sum(...nodes: Tree<number>[]): Tree<number> {
        let res: Tree<number> = nodes[0]
        for (let i = 1; i < nodes.length; i++) {
            const right = nodes[i]
            res = SnailfishUtils.merge(res, right)
            SnailfishUtils.reduce(res)
        }
        return res
    }

    public static magnitude(node: Tree<number>): number {
        const left  = isValueNode(node.left)  ? node.left.value  : SnailfishUtils.magnitude(node.left)
        const right = isValueNode(node.right) ? node.right.value : SnailfishUtils.magnitude(node.right)
        return (3 * left) + (2 * right)
    }
}

export function getMagnitudeOfFinalSum(input: string): number {
    const nodes = input.split('\n')
        .filter(s => s.match(/^\[[0-9,\[\]]+\]$/))
        .map(s => JSON.parse(s) as TreeArray<number>)
        .map(a => Tree.createFromArray(a))

    const tree = SnailfishUtils.sum(...nodes)

    return SnailfishUtils.magnitude(tree)
}

export function getLargestMagnitudeOf2(input: string): number {
    const treeArrays = input.split('\n')
        .filter(s => s.match(/^\[[0-9,\[\]]+\]$/))
        .map(s => JSON.parse(s) as TreeArray<number>)

    const getMagnitude = (one: TreeArray<number>, two: TreeArray<number>) => (
        SnailfishUtils.magnitude(
            SnailfishUtils.sum(
                Tree.createFromArray(one),
                Tree.createFromArray(two),
            ),
        )
    )

    let max = 0
    for (let i = 0; i < treeArrays.length - 1; i++) {
        const treeArray1 = treeArrays[i]
        for (let j = i + 1; j < treeArrays.length; j++) {
            const treeArray2 = treeArrays[j]
            const res1 = getMagnitude(treeArray1, treeArray2)
            const res2 = getMagnitude(treeArray2, treeArray1)
            const curMax = Math.max(res1, res2)
            if (curMax > max) max = curMax
        }
    }

    return max
}

export const partOne = (input: string) => getMagnitudeOfFinalSum(input)
export const partTwo = (input: string) => getLargestMagnitudeOf2(input)
