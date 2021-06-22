import { NextApiHandler } from 'next'

import { getLatest } from '../../../core/services/getLatest'

const api: NextApiHandler = async (_req, res) => {
  try {
    const latestLotteryId = await getLatest()

    const fetchedLotto = await fetch(`https://lotto.api.rayriffy.com/api/v1/lotto/${latestLotteryId}`).then(o => o.json())

    res.setHeader('Cache-Control', 's-maxage=300')
    res.setHeader('Access-Control-Allow-Origin', '*')

    return res.send(fetchedLotto)
  } catch (e) {
    console.error(e)
    return res.status(400).send({
      status: 'crash',
      response: 'api cannot fulfill your request at this time'
    })
  }
}

export default api
