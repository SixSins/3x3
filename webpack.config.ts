import * as path from "path";

let config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname) + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  }
}

module.exports = config;
