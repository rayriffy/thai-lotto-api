import { NextApiHandler } from 'next'

const api: NextApiHandler = (_req, res) => {
  return res.send({
    status: 'success',
    response: 'pong',
  })
}

export default api
