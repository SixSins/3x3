let path = require("path");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let extractSass = new ExtractTextPlugin({
  filename: "style.css",
  disable: typeof process.env.NODE_ENV !== "undefined" && process.env.NODE_ENV.toLowerCase() === "development"
});

let config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname) + "/dist",
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader"
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                outputStyle: "compressed",
                sourceMap: true
              }
            }
          ],
          fallback: "style-loader"
        }),
      }
    ]
  },
  plugins: [
    extractSass
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"]
  },
  devServer: {
    contentBase: "dist"
  }
}

module.exports = config;
