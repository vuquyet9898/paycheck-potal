module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'next',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      node: {
        "config": "./next.config.js",
        extensions: ['.js', '.jsx', '.json', '.css'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  plugins: ['react', 'prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'linebreak-style': 'off',
    'react/prop-types': [
      'error',
      {
        skipUndeclared: true,
      },
    ],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.json'],
      },
    ],
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    'react/prefer-stateless-function': ['off', { ignorePureComponents: true }],
    'react/button-has-type': 'warn',
    'no-irregular-whitespace': 'error',
    'no-tabs': 'error',
    'no-unused-vars': 'warn',
    'consistent-return': 'warn',
    'max-lines': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/no-array-index-key': 'warn',
  },
};
