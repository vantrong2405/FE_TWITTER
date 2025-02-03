import { useMutation } from '@tanstack/react-query'
import { mediaApi } from '@/app/apis/medias.api'

export function useUploadImage() {
  const {
    mutateAsync: uploadImage,
    isPending: isUploadingImage,
    error
  } = useMutation({
    mutationFn: (file: File) => mediaApi.uploadImage(file)
  })

  return {
    uploadImage,
    isUploadingImage,
    error
  }
}
