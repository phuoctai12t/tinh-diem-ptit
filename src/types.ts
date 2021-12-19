import { FC } from 'react'

export type IRoute = {
  path: string
  component: FC
}

export type IState = 'loading' | 'success' | 'error'
