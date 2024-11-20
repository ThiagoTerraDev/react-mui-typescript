import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "indent": [
        "error", 
        2,
        {
          "SwitchCase": 1,
        }
      ],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/ban-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    }
  },
];
