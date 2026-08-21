const jest = require("eslint-plugin-jest");

module.exports = [
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs["flat/recommended"].rules,
    },
  },
];
