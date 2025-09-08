module.exports = (env = {}) => {

  return require('./webpack.base')({
    mode: "production",
    optimization: {
      minimize: true,
    },
    apiUrl: env.apiUrl,
    target: "browserslist",
  }, env.appType);
};