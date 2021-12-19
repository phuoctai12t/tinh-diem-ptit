import api from './api'
import { IQuestionSubmit } from './apiInterfaces'
import API_CONSTANTS from './constants'

export default {
  get: (id: string) => {
    return api.get(API_CONSTANTS.QUESTION.GET(id))
  },

  submit: (id: string, params: IQuestionSubmit) => {
    return api.post(API_CONSTANTS.QUESTION.SUBMIT(id), params)
  },
}
