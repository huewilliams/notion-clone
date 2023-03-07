import babel from "@rollup/plugin-babel";
import css from "rollup-plugin-import-css";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/bundle.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { "runtime": "automatic", "importSource": "@emotion/react" }],
        "@babel/preset-typescript",
      ],
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    }),
    css(),
    typescript()
  ]
};
