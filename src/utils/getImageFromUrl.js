const fetch = require('node-fetch')
const sharp = require('sharp')

/**
 * Get image from a URL as a Base64 String
 * @param {string} url 
 * @returns {Promise<string>} base64ImageString
 */
module.exports = async (url) => {
    const imageResponse = await fetch(url)
    const imageBlob = await imageResponse.buffer()
  
    const imageBuffer = await sharp(imageBlob).resize(1000).toBuffer()
    const imageBase64 = imageBuffer.toString('base64')

    return imageBase64
}