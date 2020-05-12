const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    })

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    config.plugins.push(new Dotenv({ silent: true }));

    return config
  },
}
