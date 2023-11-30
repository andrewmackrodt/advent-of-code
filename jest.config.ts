import type { Config } from '@jest/types'

const jestConfig: Config.InitialOptions = {
    collectCoverageFrom: [
        'src/**/*.ts',
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    roots: [
        '<rootDir>/src',
    ],
    testEnvironment: 'node',
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', {
            jsc: {
                parser: {
                    decorators: true,
                    syntax: 'typescript',
                },
                transform: {
                    decoratorMetadata: true,
                },
            },
        }],
    },
}

export default jestConfig
