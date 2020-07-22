const fetchGitHubData = require('../integrations/fetchGitHubData')
const getSectionContent = require('../utils/getSectionContent')
const fetchWebPosts = require('../integrations/fetchWebPosts')
const { writeFileSync, readFileSync } = require('fs')

module.exports = async (templatePath, outputPath, gitHubToken, rssUrl) => {
  const template = readFileSync(templatePath, 'utf-8')

  const gh = await fetchGitHubData(gitHubToken)

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

  writeFileSync(outputPath, outputContent)
}
