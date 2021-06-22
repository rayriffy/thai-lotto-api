import { NextApiHandler } from 'next'

const api: NextApiHandler = (_req, res) => {
  res.setHeader('Cache-Control', 's-maxage=31104000')
  return res.send({
    status: 'success',
    response: 'pong',
  })
}

export default api
