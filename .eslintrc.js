module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  // extends: ['@react-native-community', 'eslint:all'],
  extends: ['react-app', '@react-native-community', 'plugin:jest/recommended'],
  plugins: ['prettier', 'jest'],
  parser: '@babel/eslint-parser',
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
  overrides: [
    {
      files: ['**/__tests__/**/*.test.js'],
      env: {
        // jest: true, // now **/*.test.js files' env has both es6 *and* jest
        'jest/globals': true,
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
  ],
};
