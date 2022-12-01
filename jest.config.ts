import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
    collectCoverageFrom: [
        'src/**/*.ts',
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    preset: 'ts-jest/presets/default-esm',
    roots: [
        '<rootDir>/src',
    ],
    testEnvironment: 'node',
    transform: {
        '.+\.tsx?$': ['ts-jest', { useESM: true }],
    },
}

export default jestConfig
