import { create } from 'zustand'
import { User } from '../type/user.type'
import { Dispatch, SetStateAction } from 'react'
import { getProfileFromLS } from '../utils/utils'

type Store = {
  openChats: User[]
  addChat: (user: User) => void
  removeChat: (userId: string) => void
  profile: User | null
  setProfile: Dispatch<SetStateAction<User | null>>
}

export const useStoreLocal = create<Store>()((set) => ({
  openChats: [],
  addChat: (user) =>
    set((state) => {
      if (state.openChats.some((chat) => chat._id === user._id)) return state
      return { openChats: [...state.openChats, user] }
    }),
  removeChat: (userId) =>
    set((state) => ({
      openChats: state.openChats.filter((chat) => chat._id !== userId)
    })),
  profile: getProfileFromLS(),
  setProfile: (profile) =>
    set((state) => ({
      profile:
        typeof profile === 'function' ? (profile as (prevState: User | null) => User | null)(state.profile) : profile
    }))
}))
