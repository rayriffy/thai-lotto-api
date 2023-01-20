import { load } from 'cheerio'

export const getList = async (page: number) => {
  const $ = load(
    await fetch(`https://news.sanook.com/lotto/archive/page/${page}`).then(o =>
      o.text()
    )
  )

  const res = $(
    'div.box-cell.box-cell--lotto.content > div > div > div > article.archive--lotto'
  )
    .map((_, element) => {
      const titleElement = $(
        'div.archive--lotto__body > div > a > div > h3.archive--lotto__head-lot',
        element
      )
      const linkElement = $('div > div > a', element)

      const id = linkElement.attr('href')?.split('/')[5]

      const rawTitleText = titleElement.text()
      const parsedTitle = rawTitleText.substring(
        rawTitleText.indexOf('ตรวจหวย') + 8
      )

      return {
        id: id || '',
        url: `/lotto/${id}`,
        date: parsedTitle,
      }
    })
    .toArray()

  return res
}
