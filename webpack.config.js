const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  entry: ["./src/index.js"],
  context: __dirname,
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    chunkFilename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    before: (app, server) => {
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  stats: "errors-only",
  devtool: "cheap-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new FaviconsWebpackPlugin({
      logo: "./src/images/favicon.png",
      prefix: "images/",
      inject: true,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    }),
    // new CopyWebpackPlugin([
    //   { from: "src/images", to: "images" }
    // ]),
    new ManifestPlugin()
  ],
  // optimization
  optimization: {
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        // vendor chunk
        vendor: {
          // sync + async chunks
          chunks: "all",

          // import file path containing node_modules
          test: /node_modules/
        }
      }
    }
  }
};
