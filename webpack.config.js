const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  context: __dirname,
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          { "loader": "file-loader",
          options: {
            name: '[name].[ext]',
          }}
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          { "loader": "file-loader",
          options: {
            name: '[name].[ext]',
          }}
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: "style-loader"
        },
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader", options: {
            sourceMap: true
          }
        },
        {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  stats: "errors-only",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      favicon: "./src/images/favicon-32x32.png"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
    /*,
    new BundleAnalyzerPlugin()*/
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
          chunks: 'all',

          // import file path containing node_modules
          test: /node_modules/
        }
      }
    }
  }
};
