
/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
  "files": "src/**",
  "targets": [
    "react",
    "vue",
    "angular",
    "reactNative"
  ],
  "dest": "packages",
  "commonOptions": {
    "typescript": true
  },
  "options": {
    "reactNative": {},
    "react": {
      "stylesType": "style-tag"
    },
    "vue": {
      "stylesType": "style-tag"
    },
    "angular": {
      "stylesType": "style-tag"
    },
    "svelte": {},
    "qwik": {}
  }
}