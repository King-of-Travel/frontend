module.exports = {
  extends: 'eslint:recommended',
  plugins: ['svelte3'],
  parser: 'babel-eslint',
  rules: {
    'comma-dangle': ['error', 'never'],
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true
      }
    ],
    quotes: ['error', 'single']
  },
  overrides: [
    {
      files: ['./src/routes/**/*.svelte', './src/components/**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/first': 'off',
        'import/no-mutable-exports': 'off',
        'import/prefer-default-export': 'off'
      }
    }
  ],
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: ['node_modules'],
  settings: {
    'svelte3/ignore-styles': attributes => attributes.global
  }
};
