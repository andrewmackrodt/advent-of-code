import { decode, isLiteralPacket, isOperatorPacket, LiteralPacket, OperatorPacket, sumPacketVersions } from './index.js'

describe('Day 16', () => {
    it('decodes literal packet: D2FE28', () => {
        const packet = decode('D2FE28') as LiteralPacket
        expect(isLiteralPacket(packet)).toBe(true)
        expect(packet.version).toEqual(6)
        expect(packet.typeId).toEqual(4)
        expect(packet.value).toEqual(2021)
    })

    it('decodes operator packet: 38006F45291200', () => {
        const packet = decode('38006F45291200') as OperatorPacket
        expect(isOperatorPacket(packet)).toBe(true)
        expect(packet.version).toEqual(1)
        expect(packet.typeId).toEqual(6)
        expect(packet.packets).toHaveLength(2)

        const subPacket1 = packet.packets[0] as LiteralPacket
        expect(isLiteralPacket(subPacket1)).toBe(true)
        expect(subPacket1.value).toEqual(10)

        const subPacket2 = packet.packets[1] as LiteralPacket
        expect(isLiteralPacket(subPacket2)).toBe(true)
        expect(subPacket2.value).toEqual(20)
    })

    it('decodes operator packet: EE00D40C823060', () => {
        const packet = decode('EE00D40C823060') as OperatorPacket
        expect(isOperatorPacket(packet)).toBe(true)
        expect(packet.version).toEqual(7)
        expect(packet.typeId).toEqual(3)
        expect(packet.packets).toHaveLength(3)

        const subPacket1 = packet.packets[0] as LiteralPacket
        expect(isLiteralPacket(subPacket1)).toBe(true)
        expect(subPacket1.value).toEqual(1)

        const subPacket2 = packet.packets[1] as LiteralPacket
        expect(isLiteralPacket(subPacket2)).toBe(true)
        expect(subPacket2.value).toEqual(2)

        const subPacket3 = packet.packets[2] as LiteralPacket
        expect(isLiteralPacket(subPacket3)).toBe(true)
        expect(subPacket3.value).toEqual(3)
    })

    const versionInputs: [number, string][] = [
        [16, '8A004A801A8002F478'],
        [12, '620080001611562C8802118E34'],
        [23, 'C0015000016115A2E0802F182340'],
        [31, 'A0016C880162017C3686B18A3D4780'],
    ]

    versionInputs.map(([expected, input]) => {
        it(`returns the sum of all packet versions: ${expected}`, () => {
            expect(sumPacketVersions(input)).toEqual(expected)
        })
    })
})
