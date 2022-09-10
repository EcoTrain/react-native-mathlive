module.exports = {
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  // extends: ['@react-native-community', 'eslint:all'],
  extends: ['@react-native-community'],
  plugins: ['prettier'],
  parser: '@babel/eslint-parser',
  // ignorePatterns: ['node_modules/', 'lib/', '.eslintrc.js', '.prettierrs.js'],
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    allowImportExportEveryWhere: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-env'],
      parserOpts: {
        plugins: ['jsx'],
      },
    },
  },
  // 0 — turn off. 1 — warning, 2 — error
  rules: {
    'prettier/prettier': 2,
    eqeqeq: 0, // Require the use of === and !==
    semi: 2,
    'arrow-spacing': [2, {before: true, after: true}],
    'comma-dangle': [2, 'always-multiline'],
    'comma-spacing': [2, {before: false, after: true}], // Space after comma
    'jsx-quotes': 2, // use '' and ""
    'no-const-assign': 2,
    'no-debugger': 2,
    'no-dupe-args': 1,
    'no-multi-spaces': [2, {ignoreEOLComments: false}],
    'no-unused-vars': 0,
    'react-native/no-inline-styles': 0,
    'react/display-name': 0,
    'react/jsx-boolean-value': [0, 'always'],
    'react/jsx-curly-spacing': 1,
    'react/jsx-no-duplicate-props': 1,
    'react/jsx-no-undef': 1,
    'react/jsx-sort-prop-types': 0,
    'react/jsx-sort-props': 0,
    'react/jsx-uses-react': 1,
    'react/no-danger': 1,
    'react/no-did-mount-set-state': 0,
    'react/no-did-update-set-state': 1,
    'react/react-in-jsx-scope': 1,
    'react/sort-comp': 2,
    'react-hooks/rules-of-hooks': 'off', // Hook startWith use
    'react/self-closing-comp': [
      2,
      {
        component: true,
        html: true,
      },
    ],
    'space-before-blocks': [2, {functions: 'always', keywords: 'always', classes: 'always'}],
  },
};
