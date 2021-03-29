const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins([withImages], {
  env: {
    CHANNEL: process.env.TWITCH_CHANNEL,
    CLIENT_ID: process.env.TWITCH_CLIENT_ID,
    ACCESS_TOKEN: process.env.TWITCH_ACCESS_TOKEN,
    CALLBACK_URL: process.env.CALLBACK_URL,
    PUBNUB_PUBLISH_KEY: process.env.PUBNUB_PUBLISH_KEY,
    PUBNUB_SUBSCRIBE_KEY: process.env.PUBNUB_SUBSCRIBE_KEY,
    PUNUB_SECRET_KEY: process.env.PUNUB_SECRET_KEY,
    AUTH_TOKEN: process.env.TWITCH_AUTH_TOKEN,
  },
  webpack(config, options) {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  },
});
