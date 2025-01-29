'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { Icons } from '../ui/icon'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ImageGrid } from './imageGrid'
import { Tweet } from '@/app/types/tweet.i'
import { TweetRemoveDialog } from './remove-dialog'
import { CheckCircle, Loader2 } from 'lucide-react'
import { useDeleteTweet } from '@/app/hook/tweets/useDeleteTweet'
import { useGetTweets } from '@/app/hook/tweets/useGetTweets'
import { pagination } from '@/app/constant/query-config'
import { useLikeTweet } from '@/app/hook/tweets/useLikeTweet'
import { useUnLikeTweet } from '@/app/hook/tweets/useUnLikeTweet'

export function TweetList() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [page, setPage] = useState(pagination.PAGE)
  const [hasMore, setHasMore] = useState(true)

  const { data: dataTweets } = useGetTweets(pagination.LIMIT, page)
  const { deleteTweet, isDeletingTweet } = useDeleteTweet()
  const { likeTweet } = useLikeTweet()
  const { unLikeTweet } = useUnLikeTweet()
  useEffect(() => {
    if (dataTweets?.tweets) {
      setTweets((prevTweets) => {
        const uniqueTweets = [
          ...prevTweets,
          ...dataTweets.tweets.filter(
            (newTweet: Tweet) => !prevTweets.some((tweet: Tweet) => tweet._id === newTweet._id)
          )
        ]
        return uniqueTweets
      })

      setHasMore(page < dataTweets.total_page)
    }
  }, [dataTweets, page])

  const fetchTweets = () => {
    if (page < dataTweets?.total_page) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handleLikeToggle = (tweet: Tweet) => {
    if (tweet.likes > 0) {
      unLikeTweet(tweet._id)
      setTweets((prevTweets) =>
        prevTweets.map((t) =>
          t._id === tweet._id
            ? {
                ...t,
                likes: 0
              }
            : t
        )
      )
    } else {
      likeTweet({ tweet_id: tweet._id })
      setTweets((prevTweets) =>
        prevTweets.map((t) =>
          t._id === tweet._id
            ? {
                ...t,
                likes: 1
              }
            : t
        )
      )
    }
  }

  return (
    <InfiniteScroll
      dataLength={tweets.length}
      next={fetchTweets}
      hasMore={hasMore}
      loader={
        <div className='flex flex-col items-center justify-center py-8'>
          <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
          <p className='mt-2 text-sm text-gray-500'>Đang tải thêm tweets...</p>
        </div>
      }
      endMessage={
        <div className='flex flex-col items-center justify-center py-12'>
          <CheckCircle className='h-12 w-12 text-green-500 mb-2' />
          <h4 className='text-lg font-semibold text-gray-800'>Bạn đã xem hết nội dung!</h4>
          <p className='text-sm text-gray-500 mt-1'>Hãy quay lại sau để xem thêm tweets mới.</p>
        </div>
      }
    >
      <div className='space-y-4'>
        {tweets.map((tweet: Tweet, index: number) => (
          <Card key={tweet._id || index} className='hover:shadow-md transition-shadow duration-200'>
            <CardContent className='p-4'>
              <div className='flex space-x-4'>
                <Avatar>
                  <AvatarImage src={tweet.user?.avatar} alt={tweet.user?.username} />
                  <AvatarFallback>{(tweet.user?.name ?? '').slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className='flex-grow flex justify-between'>
                  <div className='flex items-center space-x-2'>
                    <span className='font-bold hover:underline cursor-pointer'>{tweet.user?.name}</span>
                    <span>@{tweet.user?.username}</span>
                    <span>·</span>
                    <span className='hover:underline cursor-pointer'>
                      {formatDistanceToNow(new Date(tweet.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <div className='text-end'>
                    <TweetRemoveDialog
                      deleteTweet={deleteTweet}
                      idTweet={tweet._id}
                      isDeletetingTweet={isDeletingTweet}
                    />
                  </div>
                </div>
              </div>
              <p className='mt-2 whitespace-pre-wrap'>{tweet.content}</p>
              {tweet.medias && tweet.medias.length > 0 && (
                <div className='mt-2'>
                  <ImageGrid medias={tweet.medias} />
                </div>
              )}
              <div className='flex justify-between mt-4'>
                <Button variant='ghost' size='icon' className='hover:text-blue-500 hover:bg-blue-50'>
                  <Icons.messageCircle className='h-5 w-5 mr-1' />
                  {tweet.comment_count}
                </Button>
                <Button variant='ghost' size='icon' className='hover:text-green-500 hover:bg-green-50'>
                  <Icons.repeat className='h-5 w-5 mr-1' />
                  {tweet.retweet_count}
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className={`${tweet.likes > 0 ? 'text-blue-500' : ''}`}
                  onClick={() => handleLikeToggle(tweet)}
                >
                  <Icons.heart className='h-5 w-5 mr-1' />
                  {tweet.likes}
                </Button>
                <Button variant='ghost' size='icon' className='hover:text-blue-500 hover:bg-blue-50'>
                  <Icons.share className='h-5 w-5' />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </InfiniteScroll>
  )
}
