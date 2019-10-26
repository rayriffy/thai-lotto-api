import express from 'express'

import axios from 'axios'

import cors from 'cors'
import bodyParser from 'body-parser'
import cheerio from 'cheerio'

import { getDataFunction } from './functions/getData'

const server = express()

server.use(bodyParser.json())
server.use(cors())

server.get('/', (req, res) => {
  res.send({
    status: 'success',
    response:
      'Please go to https://github.com/rayriffy/thai-lotto-api#api for API usage',
  })
})

server.get('/latest', async (req, res) => {
  const lotto = await axios.get(`https://news.sanook.com/lotto/`)

  const $ = cheerio.load(lotto.data)

  const data =
    $('#lotto-highlight-result > p.lotto__wait').text() === 'รอผลสลากกินแบ่งรัฐบาล' ?
    await getDataFunction(
      $('body > div.section.section--lotto-check > div > div > div > div.col.span-8 > section > div.section__body > div > article:nth-child(1) > h3.lotto-check__title > a',).attr('href')
    ) : await getDataFunction(
      $('body > div.section.section--highlight.highlight-horo > div > div > div > div.lotto-highlight > div > div.lotto-check__btn-group.flex-box > div > a',).attr('href')
    )

  res.status(200).send(data)
})

server.get('/list/:page?', async (req, res) => {
  const page = req.params.page || 1

  const lotto = await axios.get(`https://news.sanook.com/lotto/archive/page/${page}`)

  const $ = cheerio.load(lotto.data)

  let pastLottos = []

  // List id
  $('body > div.wrapper > div > div.box-cell.box-cell--lotto.content > div > div > div > article.archive--lotto > div > div > a').each((i, elem) => {
    const id = $(elem).attr('href').split('/')[5]

    pastLottos.push({
      id: id,
      url: `/lotto/${id}`
    })
  })

  // List name
  $('body > div.wrapper > div > div.box-cell.box-cell--lotto.content > div > div > div > article.archive--lotto > div.archive--lotto__body > div > a > div > h3.archive--lotto__head-lot',).each((i, elem) => {
    pastLottos[i].date = $(elem)
      .text()
      .substr(
        $(elem)
          .text()
          .indexOf('ตรวจหวย') + 8,
      )
  })

  res.send({
    status: 'success',
    response: pastLottos,
  })
})

server.get('/lotto/:id', async (req, res) => {
  const lotto = await getDataFunction(`https://news.sanook.com/lotto/check/${req.params.id}`)

  res.status(200).send(lotto)
})

server.get('*', (req, res) => {
  res.send(
    {
      status: 'failure',
      response: 'route not found',
    },
    404,
  )
})

export default server
