import axios from 'axios'
import cheerio from 'cheerio'

export const getDataFunction = async (url: string) => {
  const lotto = await axios.get(url)

  const $ = cheerio.load(lotto.data)

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

  return {
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
  }
}
