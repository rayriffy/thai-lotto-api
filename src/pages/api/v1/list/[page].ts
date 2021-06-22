import { NextApiHandler } from 'next'

import { getList } from '../../../../core/services/getList'

const api: NextApiHandler = async (req, res) => {
  try {
    const page = req.query?.page ?? "1"

    if (!Number.isSafeInteger(Number(page))) {
      return res.status(400).send({
        status: 'crash',
        response: 'invalid positive integer'
      })
    } else {
      const targetPage = Number(page)

      const lists = await getList(targetPage)

      res.setHeader('Cache-Control', 's-maxage=7200')

      return res.send({
        status: 'success',
        response: lists,
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
