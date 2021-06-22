import { NextApiHandler } from 'next'

const api: NextApiHandler = (_req, res) => {
  return res.send({
    status: 'success',
    response: 'Please go to https://github.com/rayriffy/thai-lotto-api#api for API usage',
  })
}

export default api
