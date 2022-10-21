export default {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  collectCoverage: false,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  preset: "@shel/jest-mongodb",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
