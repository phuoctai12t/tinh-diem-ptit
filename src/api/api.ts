import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { storage } from 'helpers'
import queryString from 'query-string'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  },
  paramsSerializer: params => queryString.stringify(params),
})

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  try {
    const token = storage.get('token')
    token && (config.headers['Authorization'] = `Bearer ${token}`)
  } catch (error) {}
  return config
})

api.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response.data
  },
  err => {
    throw err?.response?.data?.message
  }
)

export default api
