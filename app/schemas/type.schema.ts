import { TypeSchema } from './rules'

export type TypeFormDataRegister = Omit<TypeSchema, 'forgot_password_token'>

export interface TypeFormDataLogin {
  email: string
  password: string
}

export interface TypeFormDataForgot {
  email: string
}

export interface TypeFormResetPassword {
  password: string
  confirm_password: string
  forgot_password_token?: string
}
