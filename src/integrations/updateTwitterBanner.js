const Twitter = require('twitter')

/**
 * Update user's twitter banner with the provided Base64 Image
 * @param {Twitter.AccessTokenOptions} twitterConfig
 * @param {string} image Base64 Encoded Image
 */
module.exports = async (twitterConfig, image) => {
  const client = new Twitter(twitterConfig)

  const twitterResponse = await client.post('account/update_profile_banner', {
    banner: image,
  })

  return twitterResponse
}
