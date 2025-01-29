import http from '@/lib/https'

export const mediaApi = {
  uploadImage(file: File) {
    const formData = new FormData()
    formData.append('image', file)
    return http.post('/medias/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
