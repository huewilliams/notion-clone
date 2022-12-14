/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)?$",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: 'tsconfig.jest.json'
    }],
  },
}
