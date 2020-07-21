require('dotenv').config()
const fs = require('fs')
const path = require('path')
const fetchGitHubData = require('./fetchGitHubData')
const getSectionContent = require('./getSectionContent')
const fetchWebPosts = require('./fetchWebPosts')

const rssUrl = 'https://nabeelvalley.netlify.com/rss.xml'

const templateFile = 'README.template.md'
const templatePath = path.join(__dirname, templateFile)
const template = fs.readFileSync(templatePath, 'utf-8')

const outPath = path.join(__dirname, '..', 'README.md')

const main = async () => {
  const gh = await fetchGitHubData(process.env.REPO_ACCESS_TOKEN)

  const contributedContent = getSectionContent(gh.repositoriesContributedTo)
  const starsContent = getSectionContent(gh.starredRepositories)

  const rssData = await fetchWebPosts(rssUrl)
  const postContent = getSectionContent(
    rssData.posts.map((p) => ({
      name: `[${p.pubDate}] ${p.title}`,
      url: p.link,
    }))
  )

  const outputContent = template
    .replace('%%CONTRIB_REPOS%%', contributedContent)
    .replace('%%STARRED_REPOS%%', starsContent)
    .replace('%%RECENT_POSTS%%', postContent)
    .replace('%%LAST_UPDATED%%', rssData.lastBuildDate)

  fs.writeFileSync(outPath, outputContent)
}

main()
