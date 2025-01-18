import { TypeSchema } from './rules'

export type TypeFormDataRegister = Pick<
  TypeSchema,
  'email' | 'password' | 'confirm_password' | 'name' | 'date_of_birth'
>

export type TypeFormDataLogin = Pick<TypeSchema, 'email' | 'password'>
