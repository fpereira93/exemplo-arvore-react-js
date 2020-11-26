// .eslintrc.js
module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ["airbnb", "prettier", "prettier/react"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        __DEV__: 'readonly'
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["react", "prettier"],
    rules: {
        "quotes": ["off"],
        "indent": ['error', 4],
        "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
        "import/prefer-default-export": "off",
        "no-param-reassign": "off",
        "react/prop-types": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "react/style-prop-object": "off",
        "no-constant-condition": "off",
        "no-undef": "off",
        "no-debugger": "off",
        "no-console": "off",
        "react/destructuring-assignment": "off",
    }
}