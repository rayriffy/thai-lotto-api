import { load } from 'cheerio'
import type { CheerioAPI } from 'cheerio'

const scrapeText = (cheerio: CheerioAPI) => (selector: string) =>
  cheerio(selector)
    .map((_, el) => cheerio(el).text())
    .toArray()

export const getLotto = async (targetId: string | number) => {
  const url = `https://news.sanook.com/lotto/check/${targetId}`

  const $ = load(await fetch(url).then(o => o.text()))
  const scraper = scrapeText($)

  const [
    date,
    prizeFirst,
    prizeFirstNear,
    prizeSecond,
    prizeThird,
    prizeForth,
    prizeFifth,
    runningNumberFrontThree,
    runningNumberBackThree,
    runningNumberBackTwo,
  ] = await Promise.all([
    $('#contentPrint > header > h2')
      .text()
      .substring($('#contentPrint > header > h2').text().indexOf(' ') + 1),
      scraper(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(1) > strong.lotto__number'
    ), // prizeFirst
    scraper(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__sec--nearby > strong.lotto__number'
    ), // prizeFirstNear
    scraper(
      '#contentPrint > div.lottocheck__resize > div:nth-child(2) > div > span.lotto__number'
    ), // prizeSecond
    scraper(
      '#contentPrint > div.lottocheck__resize > div:nth-child(3) > div > span'
    ), // prizeThird
    scraper(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--font-mini.lottocheck__sec--bdnoneads > div.lottocheck__box-item > span.lotto__number'
    ), // prizeForth
    scraper(
      '#contentPrint > div.lottocheck__resize > div:nth-child(7) > div > span.lotto__number'
    ), // prizeFifth
    scraper(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(2) > strong.lotto__number'
    ), // runningNumberFrontThree
    scraper(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(3) > strong.lotto__number'
    ), // runningNumberBackThree
    scraper(
      '#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(4) > strong.lotto__number'
    ), // runningNumberBackTwo
  ])

  return {
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
        id: 'prizeThird',
        name: 'รางวัลที่ 3',
        reward: '80000',
        amount: prizeThird.length,
        number: prizeThird,
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
  }
}
