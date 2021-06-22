import { getPuppeteerBrowser } from './getPuppeteerBrowser'

export const getList = async (targetPage: number) => {
  const browser = await getPuppeteerBrowser()

  const page = await browser.newPage()
  await page.goto(`https://news.sanook.com/lotto/archive/page/${targetPage}`, {
    waitUntil: 'domcontentloaded',
  })

  const res = await page.$$eval('div.box-cell.box-cell--lotto.content > div > div > div > article.archive--lotto', async elements => {
    return elements.map(element => {
      const titleElement = element.querySelector('div.archive--lotto__body > div > a > div > h3.archive--lotto__head-lot')
      const linkElement = element.querySelector('div > div > a')

      const id = linkElement.getAttribute('href')?.split('/')[5]

      const rawTitleText = titleElement.textContent
      const parsedTitle = rawTitleText.substr(rawTitleText.indexOf('ตรวจหวย') + 8)

      return {
        id: id || '',
        url: `/lotto/${id}`,
        date: parsedTitle,
      }
    })
  })

  await page.close()
  await browser.close()

  return res
}
