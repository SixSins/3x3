const path = require("path");
const autoprefixer = require("autoprefixer");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

let plugins = [];

const IS_DEV = typeof process.env.NODE_ENV === "undefined" || process.env.NODE_ENV !== "netlify";

plugins.push(new MiniCssExtractPlugin({
  filename: "style.css"
}));

plugins.push(new HtmlWebpackPlugin({
  template: "src/index.ejs",
  title: "3x3 - Kill your Wither quickly",
  meta: {
    viewport: "width=device-width, initial-scale=1"
  }
}));

if (IS_DEV) {
  plugins.push(new HotModuleReplacementPlugin);
}

const config = {
  mode: IS_DEV ? "development" : "production",

  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /.s?css$/,
        use: [
          {
            loader: IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [
                autoprefixer()
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              outputStyle: "compressed"
            }
          }
        ]
      }
    ]
  },

  plugins,

  resolve: {
    extensions: [ ".js", ".jsx", ".ts", ".tsx", ".scss", ".css" ]
  },

  devtool: IS_DEV ? "eval-source-map" : false,

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
    overlay: true,
    port: 8080
  }
}

module.exports = config;
