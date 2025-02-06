import { User } from './user.i'

export interface Hashtag {
  _id: string
  name: string
  created_at: string
}

export interface Media {
  url: string
  type: number // 0: image, 1: video
}

export interface Tweet {
  _id: string
  user_id: string
  type: number
  audience: number
  content: string
  parent_id?: string
  hashtags: Hashtag[]
  mentions: string[]
  medias: Media[]
  guest_views: number
  user_views: number
  created_at: string
  updated_at: string
  user: User
  bookmarks: number
  likes: number
  retweet_count: number
  comment_count: number
  quote_count: number
}

export interface MediaType {
  url: string
  type: number // 0: image, 1: video
}

export interface CreateTweetBody {
  type: number
  audience: number
  content: string
  hashtags: string[]
  mentions: string[]
  medias: MediaType[]
  parent_id?: string
}
