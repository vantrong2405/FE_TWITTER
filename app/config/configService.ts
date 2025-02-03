import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_BACKEND_END_POINT: z.string(),
  NEXT_PUBLIC_VITE_GOOGLE_CLIENT_ID: z.string(),
  NEXT_PUBLIC_VITE_GOOGLE_AUTHORIZED_REDIRECT_URI: z.string(),
  NEXT_PUBLIC_VITE_API_URL: z.string()
})

const configEnv = configSchema.safeParse({
  NEXT_PUBLIC_BACKEND_END_POINT: process.env.NEXT_PUBLIC_BACKEND_END_POINT,
  NEXT_PUBLIC_VITE_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_VITE_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_VITE_GOOGLE_AUTHORIZED_REDIRECT_URI: process.env.NEXT_PUBLIC_VITE_GOOGLE_AUTHORIZED_REDIRECT_URI,
  NEXT_PUBLIC_VITE_API_URL: process.env.NEXT_PUBLIC_VITE_API_URL || ''
})

if (!configEnv.success) {
  console.error(configEnv.error.errors)
  throw new Error('Invalid configuration')
}

const configProject = configEnv.data

export default configProject
