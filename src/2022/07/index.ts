type Stat = (number | Stat)[]

function calculateSize(array: Stat, maxSize = 100000): [number, number] {
    let sizeSubDirs = 0
    let sizeFiles = 0
    let sizeSubDirsLessThanMaxSize = 0
    for (const item of array) {
        if (Array.isArray(item)) {
            const [sizeSubDir, sizeSubDirLessThanMaxSize] = calculateSize(item, maxSize)
            sizeSubDirs += sizeSubDir
            sizeSubDirsLessThanMaxSize += sizeSubDirLessThanMaxSize
        } else {
            sizeFiles += item
        }
    }
    const totalSize = sizeSubDirs + sizeFiles
    if (totalSize <= maxSize) {
        sizeSubDirsLessThanMaxSize += totalSize
    }
    return [totalSize, sizeSubDirsLessThanMaxSize]
}

export function partOne(input: string): number {
    let jsonStr = input.replaceAll(/[ \t]+$/gm, '')
        .split('\n')
        .filter(line => Boolean(line.length) && line.match(/^(?:\$ cd |[0-9]+ )/))
        .map(line => line
            .replace(/^\$ cd \.\./, '],')
            .replace(/^\$ cd .+/, ',[')
            .replace(/^([0-9]+) .+/, '$1,'),
        )
        .join('')
        .replaceAll(/,{2,}/g, ',')
        .replaceAll(/^,|,$/g, '')
        .replaceAll(/,\]/g, ']')
        .replaceAll(/\[,/g, '[')

    for (
        let openCount = jsonStr.match(/\[/g)?.length ?? 0, closeCount = jsonStr.match(/\]/g)?.length ?? 0;
        closeCount < openCount;
        closeCount++
    ) {
        jsonStr += ']'
    }

    const array = JSON.parse(jsonStr)

    return calculateSize(array)[1]
}
