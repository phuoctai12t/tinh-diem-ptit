import { AxiosRequestConfig } from "axios"
import api from "./api"
import { ILogin, ISendVerifyMail, ISetNewPassword, ISignUp, IVerifyCode } from "./apiInterfaces"
import API_CONSTANTS from "./constants"

export default {
  login: (params: ILogin): any => {
    return api.post(API_CONSTANTS.AUTH.LOGIN, params)
  },

  signUp: (params: ISignUp): any => {
    return api.post(API_CONSTANTS.AUTH.SIGN_UP, params)
  },

  sendVerifyMail: (params: ISendVerifyMail): any => {
    return api.get(API_CONSTANTS.AUTH.SEND_VERIFY_MAIL, { params })
  },

  verifyCode: (params: IVerifyCode): any => {
    return api.put(API_CONSTANTS.AUTH.VERIFY_CODE, params)
  },

  setNewPassword: (params: ISetNewPassword, token: string): any => {
    api.interceptors.request.use(async (config: AxiosRequestConfig) => {
      config.headers['Authorization'] = `Bearer ${token}`
      return config
    })
    return api.put(API_CONSTANTS.AUTH.SET_NEW_PASSWORD, params)
  }
}