type PacketData = (number | PacketData)[]

function isCorrectOrder(a: PacketData, b: PacketData): boolean | undefined {
    for (let i = 0, len = Math.max(a.length, b.length); i < len; i++) {
        if (a.length <= i) return true
        if (b.length <= i) return false
        const av = a[i]
        const bv = b[i]
        if (typeof av === 'number' && typeof bv === 'number') {
            if (av !== bv) {
                return av < bv
            }
        } else {
            const aa = Array.isArray(av) ? av : [av]
            const ba = Array.isArray(bv) ? bv : [bv]
            const res = isCorrectOrder(aa, ba)
            if (typeof res !== 'undefined') {
                return res
            }
        }
    }
}

export function partOne(input: string): number {
    const data = input.replace(/^\n+|\n+$/, '')
        .replaceAll(/\n{3,}/g, '\n\n')
        .split('\n\n')
        .map(group => group.split('\n')
            .filter(line => line.match(/^[0-9,\[\]]+$/))
            .map(line => eval(line)),
        ) as [PacketData, PacketData][]

    const indicies: number[] = []

    for (let i = 0, len = data.length; i < len; i++) {
        const [a, b] = data[i]

        if (isCorrectOrder(a, b)) {
            indicies.push(i + 1)
        }
    }

    return indicies.reduce((total, i) => total + i, 0)
}
