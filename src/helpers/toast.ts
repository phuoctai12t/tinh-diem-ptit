import { toast as t } from 'react-toastify'

export default {
  success: (str: any) => {
    t.success(typeof str === 'string' && str ? str : 'Sucess')
  },

  error: (str: any) => {
    t.error(typeof str === 'string' && str ? str : 'Error')
  },
}
