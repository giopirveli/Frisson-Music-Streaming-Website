module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off", // disables TS unused variable warnings
    "react-hooks/exhaustive-deps": "off", // disables warnings about hook dependencies
  },
  settings: {
    react: { version: "detect" },
  },
};
