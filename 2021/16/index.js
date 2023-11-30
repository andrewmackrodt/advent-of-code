export var PACKET_TYPE;
(function (PACKET_TYPE) {
    PACKET_TYPE[PACKET_TYPE["TYPE_ID_SUM"] = 0] = "TYPE_ID_SUM";
    PACKET_TYPE[PACKET_TYPE["TYPE_ID_PRODUCT"] = 1] = "TYPE_ID_PRODUCT";
    PACKET_TYPE[PACKET_TYPE["TYPE_ID_MINIMUM"] = 2] = "TYPE_ID_MINIMUM";
    PACKET_TYPE[PACKET_TYPE["TYPE_ID_MAXIMUM"] = 3] = "TYPE_ID_MAXIMUM";
    PACKET_TYPE[PACKET_TYPE["TYPE_ID_LITERAL"] = 4] = "TYPE_ID_LITERAL";
    PACKET_TYPE[PACKET_TYPE["TYPE_ID_GREATER_THAN"] = 5] = "TYPE_ID_GREATER_THAN";
    PACKET_TYPE[PACKET_TYPE["TYPE_ID_LESS_THAN"] = 6] = "TYPE_ID_LESS_THAN";
    PACKET_TYPE[PACKET_TYPE["TYPE_ID_EQUAL_TO"] = 7] = "TYPE_ID_EQUAL_TO";
})(PACKET_TYPE || (PACKET_TYPE = {}));
export class Packet {
    version;
    typeId;
    constructor(version, typeId) {
        this.version = version;
        this.typeId = typeId;
    }
}
export class LiteralPacket extends Packet {
    value;
    constructor(version, typeId, value) {
        super(version, typeId);
        this.value = value;
    }
}
export class OperatorPacket extends Packet {
    packets;
    constructor(version, typeId, packets = []) {
        super(version, typeId);
        this.packets = packets;
    }
    get value() {
        switch (this.typeId) {
            case PACKET_TYPE.TYPE_ID_SUM:
                return this.packets.reduce((sum, p) => sum + p.value, 0);
            case PACKET_TYPE.TYPE_ID_PRODUCT:
                return this.packets.reduce((product, p) => product * p.value, 1);
            case PACKET_TYPE.TYPE_ID_MINIMUM:
                return this.packets.map(p => p.value).sort((a, b) => a - b)[0];
            case PACKET_TYPE.TYPE_ID_MAXIMUM:
                return this.packets.map(p => p.value).sort((a, b) => b - a)[0];
            case PACKET_TYPE.TYPE_ID_LITERAL:
                throw new Error('logic error operator packet cannot have typeId 4');
            case PACKET_TYPE.TYPE_ID_GREATER_THAN:
                return Number(this.packets[0].value > this.packets[1].value);
            case PACKET_TYPE.TYPE_ID_LESS_THAN:
                return Number(this.packets[0].value < this.packets[1].value);
            case PACKET_TYPE.TYPE_ID_EQUAL_TO:
                return Number(this.packets[0].value === this.packets[1].value);
        }
    }
}
export function decode(input) {
    const buffer = [];
    let position = 0;
    let available = input.length * 4;
    const read = (length) => {
        if (available === 0) {
            return null;
        }
        length = length ? Math.min(length, available) : available;
        while (buffer.length < length) {
            const c = input[position++];
            const b = ['0', '0', '0', ...parseInt(c, 16).toString(2).split('')].slice(-4);
            buffer.push(...b);
        }
        const result = buffer.splice(0, length);
        available -= result.length;
        return result.join('');
    };
    const readInt = (length) => {
        const bits = read(length);
        return bits !== null ? parseInt(bits, 2) : -1;
    };
    const decode = () => {
        const version = readInt(3);
        const typeId = readInt(3);
        switch (typeId) {
            case 4:
                const literalBuffer = [];
                for (let i = 0, len = available; i < len; i += 5) {
                    const segment = read(5);
                    const bits = segment.slice(1);
                    if (literalBuffer.length > 0 || bits !== '0000') {
                        literalBuffer.push(bits);
                        if (segment[0] === '0') {
                            break;
                        }
                    }
                }
                const value = parseInt(literalBuffer.join(''), 2);
                return new LiteralPacket(version, typeId, value);
            default:
                const result = new OperatorPacket(version, typeId);
                switch (readInt(1)) {
                    case 0:
                        for (let len = readInt(15), oa = available; oa - available < len; result.packets.push(decode())) { }
                        break;
                    case 1:
                        for (let i = 0, len = readInt(11); i < len; i++) {
                            result.packets.push(decode());
                        }
                        break;
                    default:
                        throw new Error('error parsing sub packets');
                }
                return result;
        }
    };
    return decode();
}
export function sumPacketVersions(input) {
    const sumVersions = (packet) => {
        let sum = packet.version;
        if (packet instanceof OperatorPacket) {
            for (const p of packet.packets) {
                sum += sumVersions(p);
            }
        }
        return sum;
    };
    const packet = decode(input);
    return sumVersions(packet);
}
export const partOne = (input) => sumPacketVersions(input);
export const partTwo = (input) => decode(input).value;
