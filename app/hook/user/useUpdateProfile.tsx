import { userApi } from '@/app/apis/user.api'
import { queryKey } from '@/app/constant/query-key'
import { IValidateUpdateProfile } from '@/app/schemas/updateProfile.schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateProfile(onclose: () => void) {
  const queryClient = useQueryClient()
  const { mutate: mutateUpdateProfile, isPending: isPendingUpdateProfile } = useMutation({
    mutationFn: (body: IValidateUpdateProfile) => {
      return userApi.updateProfile(body)
    },
    onSuccess: (data) => {
      onclose()
      queryClient.invalidateQueries({ queryKey: [queryKey.ME] })
    },
    onError: (error) => {}
  })

  return {
    mutateUpdateProfile,
    isPendingUpdateProfile
  }
}
