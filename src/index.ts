import { existsSync, readFileSync } from 'fs'
import process from 'process'

const isTs = Boolean(process.env.TS_NODE_DEV || (<any>process)[Symbol.for('ts-node.register.instance')])
const moduleExt = isTs ? 'ts' : 'js'
const defaultYear = '2022'

function printResult(part: number, cb: () => unknown) {
    let result = cb()
    if (typeof result === 'string' && result.includes('\n')) {
        if (result.match(/^[#. \n]+$/)) {
            result = result.replaceAll(/[. ]/g, '  ').replaceAll(/#/g, '\x1b[38;5;252m\x1b[48;5;255m##\x1b[0m')
        }
        console.log(`Part ${part}:`)
        console.log(result)
    } else {
        console.log(`Part ${part}:`, result)
    }
}

async function main(): Promise<void> {
    if ( ! process.argv[2]) {
        console.error('Expected argument <day> or <year>/<day>')
        process.exit(1)
    }

    let [year, day] = process.argv[2].split('/')
    if (typeof day === 'undefined') {
        day = year
        year = defaultYear
    }

    if (parseInt(year) < 2015 || 2022 < parseInt(year)) {
        console.error('Invalid argument year: expected number between 2015 and 2022')
        process.exit(1)
    }

    if (parseInt(day) < 1 || 25 < parseInt(day)) {
        console.error('Invalid argument day: expected number between 1 and 25')
        process.exit(1)
    }

    const folderName = `0${day}`.slice(-2)
    const modulePath = new URL(`${year}/${folderName}/index.${moduleExt}`, import.meta.url)

    if ( ! existsSync(modulePath)) {
        console.error(`Module not found: ${modulePath}`)
        process.exit(1)
    }

    const module = await import(modulePath.toString())
    let input: string | undefined

    const inputPath = new URL(`${year}/${folderName}/input.txt`, import.meta.url)

    if (existsSync(inputPath)) {
        input = readFileSync(inputPath, 'utf-8')
    }

    if (typeof module.partOne === 'function') {
        printResult(1, () => module.partOne(input))
    }

    if (typeof module.partTwo === 'function') {
        printResult(2, () => module.partTwo(input))
    }
}

void main()
