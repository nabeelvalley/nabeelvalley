const xml2js = require('xml2js')
const fetch = require('node-fetch')

/**
 * Fetch RSS Feed Posts from the provided URL
 * @param {string} rssUrl
 * @returns {Promise<{
 *  lastBuildDate: string;
 *  posts: {title: string, link:string, pubDate:string};
 *}>}
 */
module.exports = async (rssUrl) => {
  const response = await fetch(rssUrl)
  const text = await response.text()
  const feed = await xml2js.parseStringPromise(text)

  const channel = feed.rss.channel[0]

  const lastBuildDate = new Date(channel.lastBuildDate[0]).toDateString()

  const posts = channel.item
  .map((i) => ({
      title: i.title[0],
      link: i.link[0],
      pubDate: new Date(i.pubDate[0]).toDateString(),
    }))
    .sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate))

  return {
    lastBuildDate,
    posts,
  }
}
