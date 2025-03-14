import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import url from "@rollup/plugin-url";
import path from "path";
import { replaceTscAliasPaths } from "tsc-alias";

const tscAlias = () => ({
  name: "tsAlias",
  writeBundle: async () => {
    await replaceTscAliasPaths();
  },
});

export default [
  {
    input: "src/index.export.ts",
    output: [
      {
        file: "build/dist/index.mjs",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      tscAlias(),
      url({
        include: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg", "**/*.gif"],
        limit: 8192,
        emitFiles: true,
        fileName: "assets/[name].[hash][extname]",
      }),
      postcss({
        extract: true,
        modules: {
          auto: /\.module\.(scss|css)$/i,
        },
        use: [
          [
            "sass",
            {
              includePaths: [path.resolve(__dirname, "src")],
            },
          ],
        ],
        inject: true,
      }),
      copy({
        targets: [
          { src: "package.json", dest: "build" },
          {
            src: path.resolve(__dirname, "node_modules/leaflet/dist/images/*"),
            dest: path.resolve(__dirname, "build/dist/images"),
          },
          {
            src: "src/assets/**",
            dest: "build/dist/assets",
          },
        ],
        hook: "writeBundle",
      }),
    ],
    external: ["react", "react-dom"],
  },
];
