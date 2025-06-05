const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/,
        enforce: "pre",
        exclude: /node_modules[/\\]@antv/,
        use: ["source-map-loader"],
      },
    ],
  },
  mode: "development",
  ignoreWarnings: [
    {
      message: /source map/,
    },
  ],
};
