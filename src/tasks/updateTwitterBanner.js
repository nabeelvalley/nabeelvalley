const getImageFromUrl = require('../utils/getImageFromUrl')
const updateTwitterBanner = require('../integrations/updateTwitterBanner')

/**
 * Get an image and set it as the twitter banner
 * @param {{
 * consumer_key: string,
 * consumer_secret: string,
 * access_token_key: string,
 * access_token_secret: string,
 * }} twitterConfig twitter client configuration
 * @param {() => Promise<string>} getImageFn function to retrieve the image url
 */
module.exports = async (twitterConfig, getImageFn) => {
  const imageUrl = await getImageFn()
  const imageBase64 = await getImageFromUrl(imageUrl)
  await updateTwitterBanner(twitterConfig, imageBase64)
}
