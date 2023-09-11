module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
	},
	extends: [
		'airbnb-base',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:vue/recommended',
		'eslint:recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'no-console': 'warn',
		'no-debugger': 'warn',
		'vue/component-name-in-template-casing': ['error', 'PascalCase'],
		'prettier/prettier': ['warn', { printWidth: 150 }],
		'no-param-reassign': 'off',
		'no-underscore-dangle': 'off',
		'no-restricted-syntax': 'off',
		'array-callback-return': 'off',
		'camelcase': 'off',
	},
	globals: {
		$nuxt: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	settings: {
		'import/resolver': {
			alias: [['@', './client']],
		},
		'import/core-modules': ['vuex'],
	},
	ignorePatterns: ['server', 'node_modules', '.nuxt', '.vscode'],
};
