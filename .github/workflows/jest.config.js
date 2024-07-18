module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      './backend/**/*.js'
    ],
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50
      }
    }
  };
  