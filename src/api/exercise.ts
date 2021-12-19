import api from './api'
import { IGetAllExercises, IQuestionSubmit } from './apiInterfaces'
import API_CONSTANTS from './constants'

export default {
  getAll: (params?: IGetAllExercises) => {
    return api.get(API_CONSTANTS.EXERCISE.GET_ALL, { params })
  },

  get: (id: string) => {
    return api.get(API_CONSTANTS.EXERCISE.GET(id))
  },

  getResults: () => {
    return api.get(API_CONSTANTS.EXERCISE.GET_RESULTS)
  },

  submit: (id: string, params: IQuestionSubmit) => {
    return api.post(API_CONSTANTS.EXERCISE.SUBMIT(id), params)
  },
}
