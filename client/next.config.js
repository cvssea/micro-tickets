module.exports = {
  // fix file change detection in docker container
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
