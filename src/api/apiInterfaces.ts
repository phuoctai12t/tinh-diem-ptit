// AUTH
export interface ILogin {
  email: string
  password: string
}

export interface ISignUp {
  name: string
  email: string
  password: string
  phone: string
}
export interface ISendVerifyMail {
  email: string
}

export interface IVerifyCode {
  email: string
  code: string
}

export interface ISetNewPassword {
  new_password: string
}

// USER
export interface IUpdateUser {
  role: 'STUDENT'
  avatar: string
  phone: string
}

export interface IUpdatePassword {
  password: string
  new_password: string
}

// TEST
export interface IQuestionSubmit {
  answers: { _id: string; answer: string | number }[]
  time: number
}

// EXERCISE
export interface IGetAllExercises {
  level?: 'level_1' | 'level_2' | 'level_3' | 'advanced'
  name?: string
}
