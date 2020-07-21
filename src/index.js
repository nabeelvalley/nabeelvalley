require('dotenv').config()
const fs = require('fs')
const path = require('path')
const fetchGitHubData = require('./fetchGitHubData')
const getSectionContent = require('./getSectionContent')

const templateFile = 'README.template.md'
const templatePath = path.join(__dirname, templateFile)
const template = fs.readFileSync(templatePath, 'utf-8')

const outPath = path.join(__dirname, '..' ,'README.md')

const main = async () => {
  const data = await fetchGitHubData(process.env.REPO_ACCESS_TOKEN)

  const contributedContent = getSectionContent(data.repositoriesContributedTo)
  const starsContent = getSectionContent(data.starredRepositories)

  const outputContent = template
    .replace('%%CONTRIB_REPOS%%', contributedContent)
    .replace('%%STARRED_REPOS%%', starsContent)

  fs.writeFileSync(outPath, outputContent)
}

main()
