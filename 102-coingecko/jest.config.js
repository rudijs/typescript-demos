/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src",
  collectCoverage: true,
  coverageDirectory: "../coverage",
}
