import bodyParser from 'body-parser'
import cheerio from 'cheerio'
import express from 'express'
import rp from 'request-promise'

const server = express()
const {PORT = 3000} = process.env

server.get('/check', (req, res) => {
  let data = []

  // Get latest lottery URL
  rp({
    uri: `https://news.sanook.com/lotto/`,
    transform: body => {
      return cheerio.load(body)
    },
  }).then($ => {
    let lottoUrl = $(
      'body > div.section.section--highlight.highlight-horo > div > div > div > div.lotto-highlight > div > div.lotto-check__btn-group.flex-box > div > a',
    ).attr('href')
    // Read all data
    rp({
      uri: lottoUrl,
      transform: body => {
        return cheerio.load(body)
      },
    }).then($ => {
      // TODO: Read all lottery data
    })
  })
})

server
  .use(bodyParser.json())
  .listen(PORT, () => console.log(`App listening on port ${PORT}!`))
