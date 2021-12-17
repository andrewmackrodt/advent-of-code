export interface Packet {
    version: number
    typeId: number
}

export interface LiteralPacket extends Packet {
    value: number
}

export interface OperatorPacket extends Packet {
    packets: Packet[]
}

export function isLiteralPacket(packet: Packet): packet is LiteralPacket {
    return 'value' in packet
}

export function isOperatorPacket(packet: Packet): packet is OperatorPacket {
    return 'packets' in packet
}

export function decode(input: string): Packet {
    const buffer: string[] = []
    let position = 0
    let available = input.length * 4

    const read = (length?: number): string | null => {
        if (available === 0) {
            return null
        }
        length = length ? Math.min(length, available) : available
        while (buffer.length < length) {
            const c = input[position++]
            const b = ['0', '0', '0', ...parseInt(c, 16).toString(2).split('')].slice(-4)
            buffer.push(...b)
        }
        const result = buffer.splice(0, length)
        available -= result.length
        return result.join('')
    }

    const readInt = (length?: number): number => {
        const bits = read(length)
        return bits !== null ? parseInt(bits, 2) : -1
    }

    const decode = (): Packet => {
        const version = readInt(3)
        const typeId = readInt(3)

        switch (typeId) {
            case 4:
                const literalBuffer: string[] = []
                for (let i = 0, len = available; i < len; i += 5) {
                    const segment = read(5)!
                    const bits = segment.slice(1)
                    if (literalBuffer.length > 0 || bits !== '0000') {
                        literalBuffer.push(bits)
                        if (segment[0] === '0') {
                            break
                        }
                    }
                }
                const value = parseInt(literalBuffer.join(''), 2)
                return { version, typeId, value } as LiteralPacket
            default:
                const result: OperatorPacket = { version, typeId, packets: [] }
                switch (readInt(1)) {
                    case 0:
                        for (
                            let len = readInt(15), oa = available;
                            oa - available < len;
                            result.packets.push(decode())
                        ) { }
                        break
                    case 1:
                        for (let i = 0, len = readInt(11); i < len; i++) {
                            result.packets.push(decode())
                        }
                        break
                    default:
                        throw new Error('error parsing sub packets')
                }
                return result
        }
    }

    return decode()
}

export function sumPacketVersions(input: string): number {
    const sumVersions = (packet: Packet) => {
        let sum = packet.version
        if (isOperatorPacket(packet)) {
            for (const p of packet.packets) {
                sum += sumVersions(p)
            }
        }
        return sum
    }
    const packet = decode(input)
    return sumVersions(packet)
}
