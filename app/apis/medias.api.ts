import httpService from '@/lib/https'

export const mediaApi = {
  uploadImage(file: File) {
    const formData = new FormData()
    formData.append('image', file)
    return httpService.post('/medias/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
