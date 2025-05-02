import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { logger } from '@bogeychan/elysia-logger'
import { dts } from 'elysia-remote-dts'

import { getList } from './functions/getList'
import { getLotto } from './functions/getLotto'
import { model } from './models'

const app = new Elysia()
  .use(cors())
  .use(dts('./src/index.ts'))
  .use(
    swagger({
      exclude: ['/', '/ping'],
    })
  )
  .use(logger())
  .model(model)
  .get('/', ({ set }) => (set.redirect = '/swagger'))
  .get('/ping', () => ({
    status: 'success',
    response: 'pong',
  }))
  .get(
    '/list/:page',
    async ({ params: { page }, set }) => {
      try {
        const lists = await getList(page)

        return {
          status: 'success',
          response: lists,
        }
      } catch (e) {
        set.status = 500
        return {
          status: 'crash',
          response: 'api cannot fulfill your request at this time',
        }
      }
    },
    {
      beforeHandle({ params, set }) {
        params.page = +params.page

        if (!Number.isSafeInteger(params.page)) {
          set.status = 400
          return {
            status: 'crash',
            response: 'invalid positive integer',
          }
        }
      },
      params: t.Object({
        page: t.Numeric(),
      }),
      response: {
        200: 'lotto.overview',
        400: 'api.error',
      },
      schema: {
        detail: {
          summary: 'Get lotto by page',
          tags: ['lotto'],
        },
      },
    }
  )
  .get(
    '/lotto/:id',
    async ({ params: { id }, set }) => {
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
    },
    {
      beforeHandle({ params, set }) {
        if (!Number.isSafeInteger(Number(params.id))) {
          set.status = 400
          return {
            status: 'crash',
            response: 'invalid positive integer',
          }
        }
      },
      params: t.Object({
        id: t.String(),
      }),
      response: {
        200: 'lotto.detail',
        400: 'api.error',
      },
      schema: {
        detail: {
          summary: 'Check lottery status by lottery number',
          tags: ['lotto'],
        },
      },
    }
  )
  .get(
    '/latest',
    async ({ set }) => {
      try {
        const latestLottery = await getList(1)
        const lotto = await getLotto(latestLottery[0].id)

        // if lotto result is incomplete, then get previous lottery result
        if (
          lotto.prizes.some(prize =>
            prize.number.some(num => num.toLowerCase().includes('x'))
          )
        ) {
          return {
            status: 'success',
            response: await getLotto(latestLottery[1].id),
          }
        } else {
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
    },
    {
      response: {
        200: 'lotto.detail',
        400: 'api.error',
      },
      schema: {
        detail: {
          summary: 'Latest price annoucement',
          tags: ['lotto'],
        },
      },
    }
  )
  .listen(process.env.PORT ?? 3000)

export type App = typeof app

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
)
