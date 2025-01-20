import { io } from 'socket.io-client'
import { getAccessTokenFromLS } from './utils'

const socket = io(process.env.VITE_API_URL, {
  autoConnect: false,
  auth: {
    Authorization: `Bearer ${getAccessTokenFromLS()}`
  },
  transports: ['websocket'],
  upgrade: false
})

export default socket
