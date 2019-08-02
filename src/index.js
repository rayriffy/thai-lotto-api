import bodyParser from 'body-parser'
import cheerio from 'cheerio'
import express from 'express'
import rp from 'request-promise'

const server = express()
const {PORT = 3000} = process.env

function getData(url, res) {
  rp({
    uri: url,
    transform: body => {
      return cheerio.load(body)
    },
  }).then($ => {
    // Retrive data
    let date = $('#contentPrint > h2')
      .text()
      .substr(
        $('#contentPrint > h2')
          .text()
          .indexOf(' ') + 1,
      )
    let prizeFirst = []
    $(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(1) > strong.lotto__number',
    ).each((i, elem) => {
      prizeFirst.push($(elem).text())
    })
    let prizeFirstNear = []
    $(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__sec--nearby > strong.lotto__number',
    ).each((i, elem) => {
      prizeFirstNear.push($(elem).text())
    })
    let prizeSecond = []
    $(
      '#contentPrint > div.lottocheck__resize > div:nth-child(2) > div > span.lotto__number',
    ).each((i, elem) => {
      prizeSecond.push($(elem).text())
    })
    let prizeThrid = []
    $(
      '#contentPrint > div.lottocheck__resize > div:nth-child(3) > div:nth-child(2) > span.lotto__number',
    ).each((i, elem) => {
      prizeThrid.push($(elem).text())
    })
    let prizeForth = []
    $(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--font-mini.lottocheck__sec--bdnoneads > div.lottocheck__box-item > span.lotto__number',
    ).each((i, elem) => {
      prizeForth.push($(elem).text())
    })
    let prizeFifth = []
    $(
      '#contentPrint > div.lottocheck__resize > div:nth-child(6) > div.lottocheck__box-item > span.lotto__number',
    ).each((i, elem) => {
      prizeFifth.push($(elem).text())
    })
    let runningNumberFrontThree = []
    $(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(2) > strong.lotto__number',
    ).each((i, elem) => {
      runningNumberFrontThree.push($(elem).text())
    })
    let runningNumberBackThree = []
    $(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(3) > strong.lotto__number',
    ).each((i, elem) => {
      runningNumberBackThree.push($(elem).text())
    })
    let runningNumberBackTwo = []
    $(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(4) > strong.lotto__number',
    ).each((i, elem) => {
      runningNumberBackTwo.push($(elem).text())
    })

    // Push data
    res.send({
      status: 'success',
      response: {
        date: date,
        endpoint: url,
        prizes: [
          {
            id: 'prizeFirst',
            name: 'รางวัลที่ 1',
            reward: '6000000',
            amount: prizeFirst.length,
            number: prizeFirst,
          },
          {
            id: 'prizeFirstNear',
            name: 'รางวัลข้างเคียงรางวัลที่ 1',
            reward: '100000',
            amount: prizeFirstNear.length,
            number: prizeFirstNear,
          },
          {
            id: 'prizeSecond',
            name: 'รางวัลที่ 2',
            reward: '200000',
            amount: prizeSecond.length,
            number: prizeSecond,
          },
          {
            id: 'prizeThrid',
            name: 'รางวัลที่ 3',
            reward: '80000',
            amount: prizeThrid.length,
            number: prizeThrid,
          },
          {
            id: 'prizeForth',
            name: 'รางวัลที่ 4',
            reward: '40000',
            amount: prizeForth.length,
            number: prizeForth,
          },
          {
            id: 'prizeFifth',
            name: 'รางวัลที่ 5',
            reward: '20000',
            amount: prizeFifth.length,
            number: prizeFifth,
          },
        ],
        runningNumbers: [
          {
            id: 'runningNumberFrontThree',
            name: 'รางวัลเลขหน้า 3 ตัว',
            reward: '4000',
            amount: runningNumberFrontThree.length,
            number: runningNumberFrontThree,
          },
          {
            id: 'runningNumberBackThree',
            name: 'รางวัลเลขท้าย 3 ตัว',
            reward: '4000',
            amount: runningNumberBackThree.length,
            number: runningNumberBackThree,
          },
          {
            id: 'runningNumberBackTwo',
            name: 'รางวัลเลขท้าย 2 ตัว',
            reward: '2000',
            amount: runningNumberBackTwo.length,
            number: runningNumberBackTwo,
          },
        ],
      },
    })
  })
}

server.get('/', (req, res) => {
  res.send({
    status: 'success',
    response:
      'Please go to https://github.com/rayriffy/thai-lotto-api#api for API usage',
  })
})

server.get('/latest', (req, res) => {
  // Get latest lottery URL
  rp({
    uri: `https://news.sanook.com/lotto/`,
    transform: body => {
      return cheerio.load(body)
    },
  }).then($ => {
    let lottoUrl

    if (
      $('#lotto-highlight-result > p.lotto__wait').text() ===
      'รอผลสลากกินแบ่งรัฐบาล'
    ) {
      lottoUrl = $(
        'body > div.section.section--lotto-check > div > div > div > div.col.span-8 > section > div.section__body > div > article:nth-child(1) > h3.lotto-check__title > a',
      ).attr('href')
    } else {
      lottoUrl = $(
        'body > div.section.section--highlight.highlight-horo > div > div > div > div.lotto-highlight > div > div.lotto-check__btn-group.flex-box > div > a',
      ).attr('href')
    }

    getData(lottoUrl, res)
  })
})

server.get('/list/:page?', (req, res) => {
  let page = req.params.page || 1
  rp({
    uri: `https://news.sanook.com/lotto/archive/page/${page}`,
    transform: body => {
      return cheerio.load(body)
    },
  }).then($ => {
    let pastLottos = []
    // List id
    $(
      'body > div.wrapper > div > div.box-cell.box-cell--lotto.content > div > div > div > article.archive--lotto > div > div > a',
    ).each((i, elem) => {
      pastLottos.push({})
      pastLottos[i].id = $(elem)
        .attr('href')
        .split('/')[5]
      pastLottos[i].url = '/lotto/' + pastLottos[i].id
    })
    // List name
    $(
      'body > div.wrapper > div > div.box-cell.box-cell--lotto.content > div > div > div > article.archive--lotto > div.archive--lotto__body > div > a > div > h3.archive--lotto__head-lot',
    ).each((i, elem) => {
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
})

server.get('/lotto/:id', (req, res) => {
  getData('https://news.sanook.com/lotto/check/' + req.params.id, res)
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

server
  .use(bodyParser.json())
  .listen(PORT, () => console.log(`App listening on port ${PORT}!`))
