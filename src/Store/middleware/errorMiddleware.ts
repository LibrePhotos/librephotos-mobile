import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'

import { Endpoints } from '../api'
import { AuthErrorSchema } from '../Auth/auth.zod'

export const errorMiddleware: Middleware =
  ({ dispatch }: MiddlewareAPI) =>
  next =>
  action => {
    if (isRejectedWithValue(action)) {
      if (action.meta.arg && action.meta.arg.endpointName in Endpoints) {
        const {
          data: { errors },
        } = AuthErrorSchema.parse(action.payload)
        errors.forEach(error => {
          console.log('Error: ' + error)
        })
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return next(action)
  }
