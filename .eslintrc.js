module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier',
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'no-return-assign': ['error', 'except-parens'],
    'space-before-function-paren': ['error', 'never'],
  },
};
