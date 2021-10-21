import { getLotto } from './getLotto'
import { getPuppeteerBrowser } from './getPuppeteerBrowser'

export const getLatest = async () => {
  const browser = await getPuppeteerBrowser()

  const page = await browser.newPage()
  await page.goto(`https://news.sanook.com/lotto/`, {
    waitUntil: 'domcontentloaded',
  })

  try {
    const waitForNewLotto = await page.$eval('#lotto-highlight-result > p.lotto__wait', e => e?.textContent)
    const targetSelector = (waitForNewLotto ?? '').trim() === 'รอผลสลากกินแบ่งรัฐบาล' ? 'body > div.section.section--lotto-check > div > div > div > div.col.span-8 > section > div.section__body > div > article:nth-child(1) > h3.lotto-check__title > a' : 'body > div.section.section--highlight.highlight-horo > div > div > div > div.lotto-highlight > div > div.lotto-check__btn-group.flex-box > div > a'
    const targetId = await page.$eval(targetSelector, e => e.getAttribute('href'))

    await page.close()
    await browser.close()
  
    return targetId.split('/')[5]
  } catch {
    const targetSelector = 'body > div.section.section--highlight.highlight-horo > div > div > div > div.lotto-highlight > div > div.lotto-check__btn-group.flex-box > div > a'
    const targetId = await page.$eval(targetSelector, e => e.getAttribute('href'))

    await page.close()
    await browser.close()
  
    return targetId.split('/')[5]
  }
}