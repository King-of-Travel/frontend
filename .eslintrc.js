module.exports = {
  extends: 'eslint:recommended',
  plugins: ['svelte3', 'prefer-let', 'import'],
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
    quotes: ['error', 'single'],
    'no-var': 'error',
    'prefer-const': 'off',
    'max-len': ['error', 80],
    'prefer-let/prefer-let': 'error',
    'template-curly-spacing': ['error', 'never'],
    'prefer-let/prefer-let': 'error',
    'prefer-arrow-callback': 'error',
    'no-dupe-class-members': 'error',
    'no-this-before-super': 'error',
    'prefer-rest-params': 'error',
    'constructor-super': 'error',
    'object-shorthand': 'error',
    'require-yield': 'error',
    'arrow-spacing': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'import/first': 2,
    'import/no-duplicates': 2,
    'import/newline-after-import': 1,
    'import/no-named-default': 2,
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['index', 'sibling', 'parent'],
          'object'
        ],
        pathGroups: [
          {
            pattern: 'components/**/*',
            group: 'internal'
          },
          {
            pattern: 'navigation/**/*',
            group: 'internal'
          },
          {
            pattern: 'request/**/*',
            group: 'internal'
          },
          {
            pattern: 'utils/**/*',
            group: 'internal'
          },
          {
            pattern: 'server/**/*',
            group: 'internal'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always'
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/first': 'off',
        'import/no-mutable-exports': 'off',
        'import/prefer-default-export': 'off'
      }
    }
  ],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  ignorePatterns: ['node_modules', '*.html', '*.css', '*.json'],
  settings: {
    'svelte3/ignore-styles': () => true
  }
};
