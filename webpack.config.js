const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Package = require("./package.json");
// Customize these
const NAME = "Augmented Next";
const LOGO = "./src/images/favicon.png";

const isProd = process.argv[process.argv.indexOf("--mode") + 1] === "production";

console.info(`Mode: ${((isProd) ? "Production" : "Development")}`);

module.exports = {
  entry: ["./src/index.js"],
  context: __dirname,
  output: {
    clean: true,
    filename: "index.js",
    chunkFilename: "[name].js",
    publicPath: "",
    globalObject: "this",
  },
  resolve: {
    fallback: { "path": require.resolve("path-browserify") }
  },
  target: "web",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10000
          }
        },
        generator: {
          filename: "images/[name]-[contenthash:8][ext]"
        }
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10000
          }
        },
        generator: {
          filename: "fonts/[name]-[contenthash:8][ext]"
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: "style-loader"
        },
        {
          loader: "css-loader", options: {
            sourceMap: (isProd) ? false : true
          }
        },
        {
          loader: "sass-loader", options: {
            sourceMap: (isProd) ? false : true
          }
        }]
      }
    ]
  },
  stats: "errors-only",
  devtool: isProd ? false : "source-map",
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(Package.version),
      APP_NAME: JSON.stringify("augmented"),
      APP_TITLE: JSON.stringify(NAME),
      DESCRIPTION: JSON.stringify(Package.description),
      AUTHOR: JSON.stringify(Package.author),
      WEBSITE: JSON.stringify(Package.homepage),
      GA: isProd ? true: false,
      IS_PROD: isProd
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      title: NAME
    }),
    new CspHtmlWebpackPlugin({
      'base-uri': "'self'",
      'object-src': "'none'",
      'script-src': [
        "www.googletagmanager.com",
        "ssl.google-analytics.com",
        "www.google-analytics.com",
        "lh3.googleusercontent.com",
        "'unsafe-inline'",
        "'self'"
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'"
      ],
      "img-src": [
        "lh3.googleusercontent.com",
        "ssl.gstatic.com",
        "www.gstatic.com",
        "'unsafe-inline'",
        "'self'",
        "data:",
        "https:"
      ]
    }),
    new FaviconsWebpackPlugin({
      logo: LOGO,
      prefix: "images/",
      inject: true,
      cache: true,
      favicons: {
      icons: {
            // Platform Options:
            // - offset - offset in percentage
            // - background:
            //   * false - use default
            //   * true - force use default, e.g. set background for Android icons
            //   * color - set background for the specified icons
            //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
            //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
            //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
            //
            android: false,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleIcon: false,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            coast: false,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            windows: false,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            yandex: false                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        }
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new WebpackPwaManifest({
      name: NAME,
      short_name: NAME,
      description: NAME,
      background_color: "#403014",
      crossorigin: "use-credentials", //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve(LOGO),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          ios: true
        }
      ]
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/images", to: "images" }
      ],
    })
  ],
  // optimization
  optimization: isProd ? {
    providedExports: true,
    usedExports: true
  } : {}
};
