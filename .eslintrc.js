module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es6': true,
    'mocha': true
  },
  'extends': [
    'eslint:recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
  ],
  'rules': {
    'indent': [
      'error',
      2, {
        'SwitchCase': 1
      }
    ],
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true
      }
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-var': [
      'error'
    ],
    'eqeqeq': [
      'error'
    ],
    'no-debugger': [
      'error'
    ],
    'keyword-spacing': [
      'error'
    ],
    'space-before-blocks': [
      'error'
    ],
    'require-atomic-updates': [
      'off'
    ]
  }
}