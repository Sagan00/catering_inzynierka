module.exports = {
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
      "^axios$": "axios/dist/node/axios.cjs",
    },
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
  };