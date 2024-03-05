module.exports = {
    extends: [
        '@remix-run/eslint-config',
        'plugin:hydrogen/recommended',
    ],
    rules: {
        'hydrogen/prefer-image-component': 'off',
        'no-useless-escape': 'off',
        'no-case-declarations': 'off',
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true,
                semi: true,
                jsxSingleQuote: true,
                quoteProps: false,
            },
        ],
    },
};
