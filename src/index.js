require('dotenv').config()
const path = require('path')

const updateReadme = require('./tasks/updateReadme')
const updateTwitterBanner = require('./tasks/updateTwitterBanner')
const getNasaImageOfTheDayUrl = require('./integrations/getNasaImageOfTheDayUrl')


const rssUrl = 'https://nabeelvalley.netlify.com/rss.xml'
const gitHubToken = process.env.REPO_ACCESS_TOKEN
const nasaApiKey = process.env.NASA_API_KEY

const twitterConfig = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

const templatePath = path.join(__dirname, 'templates/README.template.md')
const outPath = path.join(__dirname, '..', 'README.md')

const main = async () => {
  const tasks = [
    updateReadme(templatePath, outPath, gitHubToken, rssUrl),
    updateTwitterBanner(twitterConfig, () => getNasaImageOfTheDayUrl(nasaApiKey)),
  ]

  try {
    await Promise.all(tasks)
    console.log('Tasks run successfully')
  } catch (err) {
    console.error('Error running tasks:')
    console.error(err)
  }
}

main()
