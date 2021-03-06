const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');


module.exports = withPlugins(
  [
    withImages
  ],
  {
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
  }
);
