// this is all a mess, should clean up some time when it's not 1am

require('dotenv').config()
const fs = require('fs')
const { graphql } = require('@octokit/graphql')

let readMe = fs.readFileSync('README.template.md', 'utf-8')


const writeStarredRepos = (data) => {
  const listItem = ({ name, url}) => `- [${name}](${url})`

  const cardData = data.map((t) => listItem(t))

  readMe = readMe.replace('%%STARRED_REPOS%%', cardData.join('\n'))

  fs.writeFileSync('./README.md', readMe)
  console.log('Data Written to README')
}

const writContributedRepos = (data) => {
  const listItem = ({ name, url}) => `- [${name}](${url})`

  const cardData = data.map((t) => listItem(t))

  readMe = readMe.replace('%%CONTRIB_REPOS%%', cardData.join('\n'))

  fs.writeFileSync('./README.md', readMe)
  console.log('Data Written to README')
}

console.log('Fetching data from GitHub')

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.REPO_ACCESS_TOKEN}`,
  },
})

const { repository } = graphqlWithAuth(
  `{
    user(login: "nabeelvalley") {
      repositoriesContributedTo(contributionTypes: COMMIT, first: 10) {
        nodes {
          name
          url
        }
      }
      starredRepositories(last: 5) {
        nodes {
          name
          url
        }
      }
    }
  }
  
  `
).then((r) => {
  const contrib = r.user.repositoriesContributedTo.nodes
  writContributedRepos(contrib)

  const starred = r.user.starredRepositories.nodes
  writeStarredRepos(starred)
})
