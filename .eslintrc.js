module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', // Allows the use of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  // Uses the linting rules from @typescript-eslint/eslint-plugin
  extends: ['plugin:@typescript-eslint/recommended'],
  env: {
    // Enable Node.js global variables
    node: true,
  },
}
