import api from './api'
import { IQuestionSubmit } from './apiInterfaces'
import API_CONSTANTS from './constants'

export default {
  getAll: () => {
    return api.get(API_CONSTANTS.TEST.GET_ALL)
  },

  get: (id: string) => {
    return api.get(API_CONSTANTS.TEST.GET(id))
  },

  getResults: () => {
    return api.get(API_CONSTANTS.TEST.GET_RESULTS)
  },

  submit: (id: string, params: IQuestionSubmit) => {
    return api.post(API_CONSTANTS.TEST.SUBMIT(id), params)
  },
}
