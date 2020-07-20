// this is all a mess, should clean up some time when it's not 1am

require('dotenv').config()
const fs = require('fs')
const Twitter = require('twitter')
const { graphql } = require('@octokit/graphql')

let readMe = fs.readFileSync('README.template.md', 'utf-8')

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

const twitterParams = {
  screen_name: process.TWITTER_USER_HANDLE,
}

console.log('Fetching data from Twitter')
twitterClient.get(
  'statuses/user_timeline',
  twitterParams,
  (error, tweets, response) => {
    console.log('Data returned from twitter')

    if (!error) {
      writeTweets(
        tweets
          .map((t) => {
            return { handle: t.user.screen_name, text: t.text, id: t.id_str }
          })
          .slice(0, 5)
      )
    } else {
      console.log('Twitter Client Error')
      console.error(error)
    }
  }
)

const writeTweets = (data) => {
  const renderCard = ({ text, handle, id }) => `
<div style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.3s;">
  <a href="https://twitter.com/${handle}/status/${id}">${text}</a>
</div>
`

  const cardData = data.map((t) => renderCard(t))

  readMe = readMe.replace('%%TWITTER_CARDS%%', cardData.join('\n---\n'))

  fs.writeFileSync('./README.md', readMe)
  console.log('Data Written to README')
}

const writeRecentRepos = (data) => {
  const listItem = ({ name, url}) => `- [${name}](${url})`

  const cardData = data.map((t) => listItem(t))

  readMe = readMe.replace('%%RECENT_REPOS%%', cardData.join('\n'))

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
      repositoriesContributedTo(contributionTypes: COMMIT, first: 5) {
        nodes {
          name
          url
        }
      }
      topRepositories(orderBy: {field: UPDATED_AT, direction: DESC}, first: 5) {
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

  const recent = r.user.topRepositories.nodes
  writeRecentRepos(recent)
})
