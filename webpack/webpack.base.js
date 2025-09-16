const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { modifyVars } = require("../src/styles/antModifyVars");

const appEntryPoints = {
  ADMIN: {
    entry: "index-admin.tsx",
    output: "build-admin",
  },
  CABINET: {
    entry: "index-cabinet.tsx",
    output: "dist",
  },
};

module.exports = ({ apiUrl, ...options }, appType) => {
  const { mode = "development" } = options;

  const isProd = mode === "production";

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '..', 'public/js'),
            to: 'js',
            noErrorOnMissing: true,
          },
        ],
      }),
      new webpack.DefinePlugin({
        process: {
          env: {
            mode: JSON.stringify(options.mode),
            appType: JSON.stringify(appType),
            apiUrl: JSON.stringify(apiUrl),
            publicPath: JSON.stringify("/")
          },
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: appType === 'ADMIN' ? 'KPI Admin' : 'KPI Cabinet',
        template: path.resolve(__dirname, '..', 'public/index.html'),
        favicon: "src/assets/images/favicon.png",
        buildTime: new Date().toString().slice(0, 24),
      }),
      ...(options.plugins || []),
    ];

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "main.[hash:8].css",
        }),
        new CleanWebpackPlugin()
      );
    }

    return plugins;
  };

  return {
    ...options,
    entry: path.resolve(`${__dirname}/../`, "src", appEntryPoints[appType].entry),

    output: {
      filename: isProd ? "main-[hash:8].js" : undefined, // название файла. undefined - название по умолчанию
      publicPath: "/",
      path: path.resolve(`${__dirname}/../`, appEntryPoints[appType].output),
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        // loading images
        {
          test: /\.(jpg|png|gif|ico|jpeg|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name]-[sha1:hash:7].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },

        // loading css
        {
          test: /\.(css)$/,
          exclude: /node_modules/,
          use: [
            ...getStyleLoaders(),
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(`${__dirname}/../`, 'postcss.config.js'),
                },
                sourceMap: true,
              },
            },
          ],
        },

        // loading SASS/SCSS
        {
          test: /\.(s[ca]ss)$/,
          exclude: /node_modules/,
          use: [
            ...getStyleLoaders(),
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(`${__dirname}/../`, 'postcss.config.js'),
                },
                sourceMap: true,
              },
            },
            "sass-loader",
          ],
        },

        // loading LESS
        {
          test: /\.less$/,
          use: [
            ...getStyleLoaders(),
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(`${__dirname}/../`, 'postcss.config.js'),
                },
                sourceMap: true,
              },
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  modifyVars: modifyVars,
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },

    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      alias: {
        "#src": path.resolve(__dirname, "../src"),

        "#businessLogic": path.resolve(__dirname, "../src/businessLogic/"),
        "#types": path.resolve(__dirname, "../src/types/"),
        "#core": path.resolve(__dirname, "../src/core/"),
        "#constructors": path.resolve(__dirname, "../src/constructors/"),
        "#styles": path.resolve(__dirname, "../src/styles/"),

        "#stores": path.resolve(__dirname, "../src/app/stores"),
        "#pickers": path.resolve(__dirname, "../src/app/pickers/"),
        "#ui": path.resolve(__dirname, "../src/app/ui/"),
        "#components": path.resolve(__dirname, "../src/app/components/"),
        "#utils": path.resolve(__dirname, "../src/app/utils/"),
        "#hooks": path.resolve(__dirname, "../src/app/hooks/"),
        "#constants": path.resolve(__dirname, "../src/app/constants/"),

        "#images": path.resolve(__dirname, "../src/assets/images"),
        "#svgIcons": path.resolve(__dirname, "../src/assets/svg/"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".svg", ".scss", ".sass"],
      fallback: {
        process: false
      }
    },

    plugins: getPlugins(),

    devtool: isProd ? false : "eval-cheap-module-source-map",
  };
};

// "build": "webpack --mode production",
// "start": "webpack serve",