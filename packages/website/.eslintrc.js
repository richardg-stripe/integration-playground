const _ = require('lodash')

const isCI = _.toLower(process.env.CI) === 'true'
module.exports = {
  "extends": ["react-app", "prettier"],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": isCI ? "error" : "warn",
    "prefer-arrow-callback": "error",
    "no-unused-vars": isCI ? "error" : "warn",
    "react-hooks/exhaustive-deps": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/jsx-no-target-blank": "off",
    "func-style": ["error", "expression", { "allowArrowFunctions": true }]
  }
}
