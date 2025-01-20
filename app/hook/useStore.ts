import { create } from 'zustand'
import { User } from '../type/user.type'

type Store = {
  chat: boolean
  setChat: () => void
  currentIdChatReceiver: User
  setcurrentIdChatReceiver: (data: User) => void
}

export const useStoreLocal = create<Store>()((set) => ({
  chat: false,
  setChat: () => set((state) => ({ chat: !state.chat })),
  currentIdChatReceiver: {} as User,
  setcurrentIdChatReceiver: (data: User) => set((state) => ({ currentIdChatReceiver: data }))
}))
