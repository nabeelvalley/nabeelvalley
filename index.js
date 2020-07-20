require('dotenv').config()
const Twitter = require('twitter')
const fs = require('fs')

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

const params = {
  screen_name: process.TWITTER_USER_HANDLE,
}

const writeData = (data) => {
  const renderCard = ({ text, handle, id }) => `
<a href="https://twitter.com/${handle}/status/${id}">${text}</a>
  `

  const cardData = data.map((t) => renderCard(t))

  const readMe = fs
    .readFileSync('README.template.md', 'utf-8')
    .replace('%%TWITTER_CARDS%%', cardData.join('\n'))

  fs.writeFileSync('./README.md', readMe)
  console.log('Data Written to README')

  
}

console.log("Make request to Twitter Starting")
client.get('statuses/user_timeline', params, (error, tweets, response) => {

  console.log("Data returned from twitter")

  if (!error) {
    writeData(
      tweets
        .map((t) => {
          return { handle: t.user.screen_name, text: t.text, id: t.id_str }
        })
        .slice(0, 5)
    )
  } else {
    console.log("Twitter Client Error")
    console.error(error)
  }
})
