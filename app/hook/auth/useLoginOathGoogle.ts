import configProject from '@/app/config/configService'

export const getOauthGoogleUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options: Record<string, string> = {
    redirect_uri: configProject.NEXT_PUBLIC_VITE_GOOGLE_AUTHORIZED_REDIRECT_URI || '',
    client_id: configProject.NEXT_PUBLIC_VITE_GOOGLE_CLIENT_ID || '',
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(
      ' '
    )
  }
  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}
