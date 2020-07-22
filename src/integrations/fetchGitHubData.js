const { graphql } = require('@octokit/graphql')

/**
 * Fetch required data from GitHub GraphQL API
 * @param {string} authToken
 * @returns {Promise<{
 *  repositoriesContributedTo: {name:string, url:string},
 *  starredRepositories: {name:string, url:string}
 * }>}
 */
module.exports = async (authToken) => {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${authToken}`,
    },
  })

  data = await graphqlWithAuth(
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
        }`
  )
  return {
    repositoriesContributedTo: data.user.repositoriesContributedTo.nodes,
    starredRepositories: data.user.starredRepositories.nodes,
  }
}
