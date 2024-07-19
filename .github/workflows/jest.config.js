module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      'bulletin-board-app/backend/**/*.js'
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
  
