import friendApi from '@/app/apis/friend.api'
import { queryKey } from '@/app/constant/query-key'
import { IFollowFriend } from '@/app/schemas/type.schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useFollowFriend() {
  const queryClient = useQueryClient()
  const { mutate: mutateFollowFriend, isPending: isPendingFollowFriend } = useMutation({
    mutationFn: (data: IFollowFriend) => {
      return friendApi.followFriend(data)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.FRIENDS] })
    },
    onError: (error) => {
      console.error('Error following friend:', error)
    }
  })

  return {
    mutateFollowFriend,
    isPendingFollowFriend
  }
}
