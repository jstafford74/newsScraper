module.exports = {
    'env': {
      'commonjs': true,
      'es6': true,
      'node': true,
    },
    'extends': [
      'google',
    ],
    'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
      'ecmaVersion': 2018,
    },
    'rules': {
      'no-multiple-empty-lines': 'off',
      'require-jsdoc': 'off',
      'max-len': ["error", { "code": 140 }]
      // 'linebreak-style': 0,
      // 'global-require': 0,
      // 'eslint linebreak-style': [0, 'error', 'windows'],
    },
  };
  