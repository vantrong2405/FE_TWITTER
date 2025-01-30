import friendApi from '@/app/apis/friend.api'
import { IFollowFriend } from '@/app/schemas/type.schema'
import { useMutation } from '@tanstack/react-query'

export function useFollowFriend() {
  const { mutate: mutateFollowFriend, isPending: isPendingFollowFriend } = useMutation({
    mutationFn: (data: IFollowFriend) => {
      return friendApi.followFriend(data)
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Error following friend:', error)
    }
  })

  return {
    mutateFollowFriend,
    isPendingFollowFriend
  }
}
