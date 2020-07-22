const fetch = require('node-fetch')

/**
 * Get an Image URL from the Harvard Art Museums API
 * @param {string} apiKey 
 * @returns {Promise<string>} imageUrl
 */
module.exports = async (apiKey) => {
  const artApiResponse = await fetch(
    `https://api.harvardartmuseums.org/image?sort=random&apikey=${apiKey}`
  )

  const artApiData = await artApiResponse.json()
  const imageUrl = artApiData.records[0].baseimageurl

  return imageUrl
}
