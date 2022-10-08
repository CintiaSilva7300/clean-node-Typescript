
export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom : ['<rootDir>/src/**/*.ts'],
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: 'node',
  coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
