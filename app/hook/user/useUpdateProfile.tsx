import { userApi } from '@/app/apis/user.api'
import { queryKey } from '@/app/constant/query-key'
import { IValidateUpdateProfile, typeBodyUpdateProfile } from '@/app/schemas/updateProfile.schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const { mutate: mutateUpdateProfile, isPending: isPendingUpdateProfile } = useMutation({
    mutationFn: (body: typeBodyUpdateProfile) => {
      return userApi.updateProfile(body)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(queryKey.ME) || query.queryKey.includes(queryKey.PROFILE)
      })
    },
    onError: (error) => {}
  })

  return {
    mutateUpdateProfile,
    isPendingUpdateProfile
  }
}
