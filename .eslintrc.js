module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
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
  }
}
