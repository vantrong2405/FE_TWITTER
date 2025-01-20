import { create } from 'zustand'
import { User } from '../type/user.type'

type Store = {
  openChats: User[] // Danh sách người đang mở hộp chat
  addChat: (user: User) => void
  removeChat: (userId: string) => void
}

export const useStoreLocal = create<Store>()((set) => ({
  openChats: [],
  addChat: (user) =>
    set((state) => {
      if (state.openChats.some((chat) => chat._id === user._id)) return state // Tránh trùng lặp
      return { openChats: [...state.openChats, user] }
    }),
  removeChat: (userId) =>
    set((state) => ({
      openChats: state.openChats.filter((chat) => chat._id !== userId)
    }))
}))
