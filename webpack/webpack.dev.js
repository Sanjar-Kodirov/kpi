const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = (env = {}) => {
  return require("./webpack.base")({
    mode: "development",
    devServer: {
      open: true,
      port: 8014,
      hot: true,
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: "https://kpi-dep.qitmir.uz",
          secure: false,
          changeOrigin: true,
        },
      },
    },
    apiUrl: env.apiUrl,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      new webpack.SourceMapDevToolPlugin({
        filename: "[file].map",
      }),
    ],
    target: "web",
  });
};
