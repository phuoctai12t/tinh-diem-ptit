const API_CONSTANTS = {
  AUTH: {
    LOGIN: 'auth/login',
    SIGN_UP: 'auth/signup',
    SEND_VERIFY_MAIL: 'auth/reset-password',
    VERIFY_CODE: 'auth/verify-code',
    SET_NEW_PASSWORD: 'auth/reset-password',
  },
  USER: {
    GET: '',
    UPDATE: 'users/profile',
    UPDATE_PASSWORD: 'users/password',
  },
  TEST: {
    GET_ALL: 'tests',
    GET: (id: string) => `tests/${id}/questions`,
    GET_RESULTS: 'results',
    SUBMIT: (id: string) => `tests/${id}/submit`,
  },
  EXERCISE: {
    GET_ALL: 'exercises',
    GET: (id: string) => `exercises/${id}/questions`,
    GET_RESULTS: 'exercises-results',
    SUBMIT: (id: string) => `exercises/${id}/submit`,
  },
  QUESTION: {
    GET: (id: string) => `questions/${id}`,
    SUBMIT: (id: string) => `questions/${id}`,
  },
}

export default API_CONSTANTS
