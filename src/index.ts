import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { getList } from './functions/getList'
import { getLotto } from './functions/getLotto'

const app = new Elysia()
  .use(cors())
  .get('/', () => ({
    status: 'success',
    response:
      'Please go to https://github.com/rayriffy/thai-lotto-api#api for API usage',
  }))
  .get('/ping', () => ({
    status: 'success',
    response: 'pong',
  }))
  .get('/list/:page', async ({ params: { page }, set }) => {
    try {
      const targetPage = page ?? '1'

      if (!Number.isSafeInteger(Number(targetPage))) {
        set.status = 400
        return {
          status: 'crash',
          response: 'invalid positive integer',
        }
      } else {
        const lists = await getList(Number(targetPage))

        return {
          status: 'success',
          response: lists,
        }
      }
    } catch (e) {
      set.status = 500
      return {
        status: 'crash',
        response: 'api cannot fulfill your request at this time',
      }
    }
  })
  .get('/lotto/:id', async ({ params: { id }, set }) => {
    try {
      if (!Number.isSafeInteger(Number(id))) {
        set.status = 400
        return {
          status: 'crash',
          response: 'invalid positive integer',
        }
      } else {
        const lotto = await getLotto(id)

        // const lottoeryDate = dayjs(lotto.date, 'D MMMM YYYY', 'th')

        // if (lottoeryDate.isAfter(dayjs().subtract(2, 'days'))) {
        //   res.setHeader('Cache-Control', 's-maxage=2592000')
        // } else {
        //   res.setHeader('Cache-Control', 's-maxage=3600')
        // }

        // res.setHeader('Access-Control-Allow-Origin', '*')

        return {
          status: 'success',
          response: lotto,
        }
      }
    } catch (e) {
      set.status = 500
      return {
        status: 'crash',
        response: 'api cannot fulfill your request at this time',
      }
    }
  })
  .get('/latest', async ({ set }) => {
    try {
      const latestLottery = await getList(1).then(o => o[0])
      const lotto = await getLotto(latestLottery.id)

      return {
        status: 'success',
        response: lotto,
      }
    } catch (e) {
      set.status = 500
      return {
        status: 'crash',
        response: 'api cannot fulfill your request at this time',
      }
    }
  })
  .listen(process.env.PORT ?? 3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
