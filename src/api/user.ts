import api from './api'
import { IUpdatePassword, IUpdateUser } from './apiInterfaces'
import API_CONSTANTS from './constants'

export default {
  get: (isReject = false, time = 500): any => {
    // return api.get(API_CONSTANTS.USER.GET)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isReject) {
          reject('Error')
        } else {
          resolve('success')
        }
      }, time)
    })
  },
  update: (params: IUpdateUser): any => {
    return api.put(API_CONSTANTS.USER.UPDATE, params)
  },

  updatePassword: (params: IUpdatePassword): any => {
    return api.put(API_CONSTANTS.USER.UPDATE_PASSWORD, params)
  },
}
