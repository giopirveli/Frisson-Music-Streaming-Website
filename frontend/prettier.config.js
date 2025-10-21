/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: "es5",
  arrowParens: "always",
  endOfLine: "lf", // ✅ fixes build warnings about prettier/prettier (␍⏎)
};

export default config;
