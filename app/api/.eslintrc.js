module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	plugins: [ '@typescript-eslint/eslint-plugin' ],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint'
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'default',
				filter: {
					regex: '^(created|updated)_at$',
					match: false
				},
				format: [ 'camelCase' ],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow'
			},
			{
				selector: 'property',
				filter: {
					regex: '^(created|updated)_at$',
					match: false
				},
				format: [ 'camelCase', 'UPPER_CASE' ],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow'
			},
			{
				selector: 'enumMember',
				format: [ 'UPPER_CASE' ],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow'
			},
			{
				selector: 'variable',
				format: [ 'camelCase', 'UPPER_CASE' ],
				types: [ 'boolean', 'string', 'number', 'array' ],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow'
			},
			{
				selector: 'variable',
				format: [ 'camelCase', 'PascalCase' ],
				types: [ 'function' ],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow'
			},
			{
				selector: 'typeLike',
				format: [ 'PascalCase' ]
			}
		]
	}
};
