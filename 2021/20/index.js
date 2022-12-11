function parseInput(input) {
    const parts = input.split('\n\n');
    return {
        algorithm: parts[0].replace(/\n/g, ''),
        image: parts[1].split('\n').map(s => s.split('').map(c => c === '#')),
    };
}
function enhanceImage(input, iterations) {
    let outputImage = input.image;
    for (let i = 0; i < iterations; i++) {
        const inputImage = outputImage;
        const pad = 1;
        const a = (-1 - pad), b = (0 - pad), c = (1 - pad);
        const height = inputImage.length + (2 * pad);
        const width = inputImage[0].length + (2 * pad);
        const oob = i % 2 !== 0 && input.algorithm[0] === '#' && input.algorithm[511] === '.';
        outputImage = [];
        for (let y = 0; y < height; y++) {
            outputImage.push(new Array(width).fill(false));
            for (let x = 0; x < width; x++) {
                const pixels = [
                    inputImage[y + a]?.[x + a] ?? oob,
                    inputImage[y + a]?.[x + b] ?? oob,
                    inputImage[y + a]?.[x + c] ?? oob,
                    inputImage[y + b]?.[x + a] ?? oob,
                    inputImage[y + b]?.[x + b] ?? oob,
                    inputImage[y + b]?.[x + c] ?? oob,
                    inputImage[y + c]?.[x + a] ?? oob,
                    inputImage[y + c]?.[x + b] ?? oob,
                    inputImage[y + c]?.[x + c] ?? oob,
                ];
                const bin = pixels.map(b => Number(b)).join('');
                const dec = parseInt(bin, 2);
                outputImage[y][x] = input.algorithm[dec] === '#';
            }
        }
    }
    return outputImage;
}
export function solve(input, iterations) {
    const inputImage = parseInput(input);
    const outputImage = enhanceImage(inputImage, iterations);
    return outputImage.map(s => s.filter(b => b)).flat().length;
}
export const partOne = (input) => solve(input, 2);
export const partTwo = (input) => solve(input, 50);
