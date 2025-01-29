import { io } from 'socket.io-client'
import { getAccessTokenFromLS } from './utils'
import configProject from '../config/configService'

const socket = io(configProject.NEXT_PUBLIC_VITE_API_URL, {
  autoConnect: false,
  auth: {
    Authorization: `Bearer ${getAccessTokenFromLS()}`
  },
  transports: ['websocket'],
  upgrade: false
})

export default socket
