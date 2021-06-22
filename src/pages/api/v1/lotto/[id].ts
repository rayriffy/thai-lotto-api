import { NextApiHandler } from 'next'

import { getLotto } from '../../../../core/services/getLotto'

import dayjs from 'dayjs'
import 'dayjs/locale/th'

import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const api: NextApiHandler = async (req, res) => {
  try {
    const id = req.query?.id

    if (!Number.isSafeInteger(Number(id))) {
      return res.status(400).send({
        status: 'crash',
        response: 'invalid positive integer'
      })
    } else {
      const targetId = Number(id)

      const lotto = await getLotto(targetId)

      const lottoeryDate = dayjs(lotto.date, 'D MMMM YYYY', 'th')

      if (lottoeryDate.isAfter(dayjs().subtract(2, 'days'))) {
        res.setHeader('Cache-Control', 's-maxage=2592000')
      } else {
        res.setHeader('Cache-Control', 's-maxage=3600')
      }

      return res.send({
        status: 'success',
        response: lotto,
      })
    }
  } catch (e) {
    return res.status(400).send({
      status: 'crash',
      response: 'api cannot fulfill your request at this time'
    })
  }
}

export default api
