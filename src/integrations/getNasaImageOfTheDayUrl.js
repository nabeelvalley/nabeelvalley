const fetch = require('node-fetch')
const { getYesterday, yyyymmdd } = require('../utils/getDateFormat')

/**
 * Get an Image URL from the NASA Mars Rover API
 * @param {string} apiKey
 * @returns {Promise<string>} imageUrl
 */
module.exports = async (apiKey) => {
  const date = yyyymmdd(getYesterday())

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`
  )

  const data = await response.json()

  if (data && data.url) {
    return data.url
  } else {
    throw 'No photos returned from API'
  }
}
