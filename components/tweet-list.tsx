import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Icons } from './ui/icon'

const tweets = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      handle: '@johndoe',
      avatar: '/placeholder-avatar.jpg'
    },
    content: 'Just setting up my Twitter clone!',
    timestamp: '2m',
    replies: 3,
    retweets: 5,
    likes: 10
  },
  {
    id: 2,
    user: {
      name: 'Jane Smith',
      handle: '@janesmith',
      avatar: '/placeholder-avatar.jpg'
    },
    content: 'This Twitter clone looks amazing! Great job on the UI.',
    timestamp: '10m',
    replies: 1,
    retweets: 2,
    likes: 15
  }
  // Add more tweets as needed
]

export function TweetList() {
  return (
    <div className='space-y-4'>
      {tweets.map((tweet) => (
        <div key={tweet.id} className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
          <div className='flex space-x-4'>
            <Avatar>
              <AvatarImage src={tweet.user.avatar} alt={tweet.user.handle} />
              <AvatarFallback>{tweet.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className='flex-grow'>
              <div className='flex items-center space-x-2'>
                <span className='font-bold'>{tweet.user.name}</span>
                <span className='text-gray-500'>{tweet.user.handle}</span>
                <span className='text-gray-500'>· {tweet.timestamp}</span>
              </div>
              <p className='mt-2'>{tweet.content}</p>
              <div className='flex justify-between mt-4 text-gray-500'>
                <Button variant='ghost' size='sm'>
                  <Icons.messageCircle className='h-4 w-4 mr-1' />
                  {tweet.replies}
                </Button>
                <Button variant='ghost' size='sm'>
                  <Icons.repeat className='h-4 w-4 mr-1' />
                  {tweet.retweets}
                </Button>
                <Button variant='ghost' size='sm'>
                  <Icons.heart className='h-4 w-4 mr-1' />
                  {tweet.likes}
                </Button>
                <Button variant='ghost' size='sm'>
                  <Icons.share className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
