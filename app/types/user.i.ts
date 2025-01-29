import { IBaseResponseData } from './other.i'

export interface User {
  _id: string
  roles: 'User' | 'Admin'[]
  email: string
  name?: string
  date_of_birth?: string
  avatar?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
  __v: number
  verify: number
  twitter_circles: string[]
  bio: string
  location: string
  website: string
  username: string
  cover_photo: string
}

export type IUserGetMeResponse = IBaseResponseData<User>
