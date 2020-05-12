module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: ['/^vue/', 'module', 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
