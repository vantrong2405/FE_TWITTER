import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const trendingTopics = [
  { id: 1, topic: '#ReactJS', tweets: '125K' },
  { id: 2, topic: 'Next.js', tweets: '98K' },
  { id: 3, topic: 'Tailwind CSS', tweets: '87K' },
  { id: 4, topic: '#WebDev', tweets: '65K' },
  { id: 5, topic: 'TypeScript', tweets: '54K' }
]

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {trendingTopics.map((topic) => (
            <li key={topic.id} className='flex justify-between items-center'>
              <span className='font-medium hover:underline cursor-pointer'>{topic.topic}</span>
              <span className='text-sm text-gray-500'>{topic.tweets} tweets</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
