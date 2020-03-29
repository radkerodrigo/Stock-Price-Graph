module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: 'airbnb',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: [ 'react' ],
	rules: {
	curly: ['error', 'multi', 'consistent'],
	'dot-notation': 'off',
	'max-classes-per-file': ['error', 1],
	'no-alert': 'error',
	'no-implicit-coercion': 'error',
	'no-magic-numbers': ['warn', {
		ignore: [],
		ignoreArrayIndexes: true,
		enforceConst: true,
		detectObjects: false,
	}],
	'no-return-assign': 'off',
	'eol-last': ['error', 'never'],
	'linebreak-style': 'off',
	'import/no-unresolved': 'off',
	'no-tabs': 'off',
	'comma-dangle': 'off',
	'indent': ['error', 'tab'],
	'object-curly-newline': 'off',
	'class-methods-use-this': 'off',
	'prefer-template': 'off',
	'jsx-a11y/label-has-associated-control': 'off',
	'jsx-a11y/label-has-for': 'off', // deprecated
	'jsx-a11y/click-events-have-key-events': 'off',
	'jsx-a11y/no-static-element-interactions': 'off',
	'react/destructuring-assignment': 'off',
	'react/no-array-index-key': 'off',
	'react/forbid-prop-types': ['error', { forbid: ['any'] }],
	'react/jsx-indent': ['error', 'tab'],
	'react/jsx-indent-props': ['error', 'tab'],
	'react/jsx-curly-brace-presence': ['off']
	},
};