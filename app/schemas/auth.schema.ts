import { schema, TypeSchema } from './rules'

export const registerSchema = schema.pick(['email', 'password', 'confirm_password', 'name', 'date_of_birth'])

export const loginSchema = schema.pick(['email', 'password'])
