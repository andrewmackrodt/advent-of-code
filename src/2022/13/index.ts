type PacketData = (number | PacketData)[]

function packetSort(a: PacketData, b: PacketData): number {
    for (let i = 0, len = Math.max(a.length, b.length); i < len; i++) {
        if (a.length <= i) return -1
        if (b.length <= i) return 1
        const av = a[i]
        const bv = b[i]
        if (typeof av === 'number' && typeof bv === 'number') {
            if (av !== bv) {
                return av < bv ? -1 : 1
            }
        } else {
            const aa = Array.isArray(av) ? av : [av]
            const ba = Array.isArray(bv) ? bv : [bv]
            const res = packetSort(aa, ba)
            if (res !== 0) {
                return res
            }
        }
    }
    return 0
}

function parseInput(input: string): [PacketData, PacketData][] {
    return input.replace(/^\n+|\n+$/, '')
        .replaceAll(/\n{3,}/g, '\n\n')
        .split('\n\n')
        .map(group => group.split('\n')
            .filter(line => line.match(/^[0-9,\[\]]+$/))
            .map(line => JSON.parse(line)),
        ) as [PacketData, PacketData][]
}

export function partOne(input: string): number {
    return parseInput(input).reduce((total, [a, b], i) => packetSort(a, b) === -1 ? total + (i + 1) : total, 0)
}

export function partTwo(input: string): number {
    const data = parseInput(input).flat()
    let d1: PacketData, d2: PacketData
    data.push(d1 = [[2]])
    data.push(d2 = [[6]])
    data.sort(packetSort)
    return (1 + data.indexOf(d1)) * (1 + data.indexOf(d2))
}
