module.exports = {
  "verbose": true,
  rootDir: "",
  roots: ["test/unit/", "src/"],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "./test_reports",
      "filename": "report.html",
      "expand": true
    }]
  ],
  collectCoverage: true,
  coverageReporters: ["text-summary", "html"],
  coverageDirectory: "./test_reports/coverage",
  collectCoverageFrom: [
    "!test/**"
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ["./test/unit/mockers/init.ts", "./test/unit/mockers/mock.ts"],
  testEnvironment: 'node'
};