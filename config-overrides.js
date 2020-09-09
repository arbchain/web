/* config-overrides.js */

const { useBabelRc, override, useEslintRc } = require('customize-cra');

// module.exports = override(useBabelRc(), useEslintRc())

module.exports = override(useBabelRc());
