const {defaults} = require('jest-config');

module.exports = {
  ...defaults,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setup-jest.js']
};