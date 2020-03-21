const path = require('path');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: '.',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
  },
};
