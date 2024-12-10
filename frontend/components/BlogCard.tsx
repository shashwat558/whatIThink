import React from 'react'
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'

interface BlogCardProps {
  title: string
  description?: string
  readingTime: string
  publishedDate: string
  author: string
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description = '',
  author,
  readingTime,
  publishedDate,
}) => {
  const truncatedDescription =
    description && description.length > 100
      ? `${description.substring(0, 100)}...`
      : description

  return (
    <div className="relative overflow-hidden   border-gray-800 bg-black text-white shadow-md transition-all hover:shadow-lg w-[600px] border-l-[1px]">
      <div className="relative z-10 p-6">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">
          {title}
        </h2>
        {truncatedDescription && (
          <p className="mb-4 text-gray-300">
            {truncatedDescription}
          </p>
        )}
        <div className="mb-4 flex items-center space-x-2 text-sm text-gray-400">
          <UserIcon className="h-4 w-4" />
          <span>{author}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{publishedDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard

