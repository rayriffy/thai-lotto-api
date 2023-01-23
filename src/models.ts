import { t, type UnwrapSchema } from 'elysia'

export const model = {
  'lotto.overview': t.Object(
    {
      status: t.String({
        default: 'success',
      }),
      response: t.Array(
        t.Object({
          id: t.String(),
          url: t.String(),
          date: t.String(),
        })
      ),
    },
    {
      description: 'Lottery Overview',
    }
  ),
  'lotto.detail': t.Object(
    {
      status: t.String({
        default: 'success',
      }),
      response: t.Object({
        date: t.String(),
        endpoint: t.String(),
        prizes: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            reward: t.String(),
            amount: t.Number(),
            number: t.Array(t.String()),
          })
        ),
        runningNumbers: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            reward: t.String(),
            amount: t.Number(),
            number: t.Array(t.String()),
          })
        ),
      }),
    },
    {
      description: 'Full Lottery Detail',
    }
  ),
  'api.error': t.Object(
    {
      status: t.String({
        default: 'crash',
      }),
      response: t.String({
        default: 'api cannot fulfill your request at this time',
      }),
    },
    {
      description: 'Default error when API is unable to process the request',
    }
  ),
}

export interface Model {
  lotto: {
    overview: UnwrapSchema<typeof model['lotto.overview']>
    detail: UnwrapSchema<typeof model['lotto.detail']>
  }
  api: {
    error: UnwrapSchema<typeof model['api.error']>
  }
}
