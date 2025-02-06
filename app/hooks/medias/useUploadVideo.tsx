import { useMutation } from '@tanstack/react-query'
import { mediaApi } from '@/app/apis/medias.api'

export function useUploadVideo() {
  const {
    mutateAsync: uploadVideo,
    isPending: isUploadingVideo,
    error: videoError
  } = useMutation({
    mutationFn: (file: File) => mediaApi.uploadVideo(file)
  })

  return {
    uploadVideo,
    isUploadingVideo,
    videoError
  }
}
