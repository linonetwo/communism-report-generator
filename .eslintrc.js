module.exports = {
  parser: 'babel-eslint',
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'unicorn/filename-case': [
      'error',
      {
        case: 'camelCase',
      },
    ],
    'no-undef': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'prettier/unicorn',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['react', 'html', 'babel', 'react', 'unicorn', 'import'],
  globals: {
    newrelic: true,
    __nr_require: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
};
