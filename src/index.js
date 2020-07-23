require('dotenv').config()
const path = require('path')

const updateReadme = require('./tasks/updateReadme')

const gitHubToken = process.env.REPO_ACCESS_TOKEN
const rssUrl = process.env.BLOG_RSS_URL

const templatePath = path.join(__dirname, 'templates/README.template.md')
const outPath = path.join(__dirname, '..', 'README.md')

const main = async () => {
    await updateReadme(templatePath, outPath, gitHubToken, rssUrl)
}

main()
