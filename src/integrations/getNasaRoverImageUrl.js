const fetch = require('node-fetch')
const { getYesterday, yyyymmdd } = require('./utils/getDateFormat')

/**
 * Get an Image URL from the NASA Image of the Day API
 * @param {string} apiKey
 * @returns {Promise<string>} imageUrl
 */
module.exports = async (apiKey) => {
  const date = yyyymmdd(getYesterday())

  const response = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${apiKey}`
  )

  const data = await response.json()

  if (data && data.photos && data.photos.length > 0) {
    return data.photos[0].img_src
  } else {
    throw 'No photos returned from API'
  }
}
