import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { getList } from './functions/getList'
import { getLotto } from './functions/getLotto'

const app = new Elysia()
  .use(cors())
  .get(
    '/',
    () =>
      new Response(
        JSON.stringify({
          status: 'success',
          response:
            'Please go to https://github.com/rayriffy/thai-lotto-api#api for API usage',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
  )
  .get(
    '/ping',
    () =>
      new Response(
        JSON.stringify({
          status: 'success',
          response: 'pong',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
  )
  .get('/list/:page', async ({ params: { page } }) => {
    try {
      const targetPage = page ?? '1'

      if (!Number.isSafeInteger(Number(targetPage))) {
        return new Response(
          JSON.stringify({
            status: 'crash',
            response: 'invalid positive integer',
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            status: 400,
          }
        )
      } else {
        const lists = await getList(Number(targetPage))

        return new Response(
          JSON.stringify({
            status: 'success',
            response: lists,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      }
    } catch (e) {
      return new Response(
        JSON.stringify({
          status: 'crash',
          response: 'api cannot fulfill your request at this time',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 500,
        }
      )
    }
  })
  .get('/lotto/:id', async ({ params: { id } }) => {
    try {
      if (!Number.isSafeInteger(Number(id))) {
        return new Response(
          JSON.stringify({
            status: 'crash',
            response: 'invalid positive integer',
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            status: 400,
          }
        )
      } else {
        const lotto = await getLotto(id)

        // const lottoeryDate = dayjs(lotto.date, 'D MMMM YYYY', 'th')

        // if (lottoeryDate.isAfter(dayjs().subtract(2, 'days'))) {
        //   res.setHeader('Cache-Control', 's-maxage=2592000')
        // } else {
        //   res.setHeader('Cache-Control', 's-maxage=3600')
        // }

        // res.setHeader('Access-Control-Allow-Origin', '*')

        return new Response(
          JSON.stringify({
            status: 'success',
            response: lotto,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      }
    } catch (e) {
      return new Response(
        JSON.stringify({
          status: 'crash',
          response: 'api cannot fulfill your request at this time',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 500,
        }
      )
    }
  })
  .get('/latest', async () => {
    try {
      const latestLottery = await getList(1).then(o => o[0])
      const lotto = await getLotto(latestLottery.id)

      return new Response(
        JSON.stringify({
          status: 'success',
          response: lotto,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    } catch (e) {
      return new Response(
        JSON.stringify({
          status: 'crash',
          response: 'api cannot fulfill your request at this time',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 500,
        }
      )
    }
  })
  .listen(process.env.PORT ?? 3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
