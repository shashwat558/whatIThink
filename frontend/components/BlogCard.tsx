import React from 'react'
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';

import Link from 'next/link'
import { formateDate } from '@/lib/utils'
import TrashIcon from './TrashIcon';


interface BlogCardProps {
  id: string
  title: string
  description: string
  readingTime: string
  publishedDate: string
  author?: string
  onDelete: (id: string) => void;
}



const BlogCard: React.FC<BlogCardProps> = ({
    id,

  title,
  description = '',
  author,
  readingTime,
  publishedDate,
  onDelete
}) => {
  const truncatedDescription =
    description && description.length > 100
      ? `${description.substring(0, 100)}...`
      : description

  return (
    <div className="relative overflow-hidden   border-gray-600 bg-[#353941] text-white shadow-md transition-all hover:shadow-lg w-[600px] border-l-[1px] border-b-[1px]">
        
        <div className="relative z-10 p-6">
        <div className='flex justify-between'> <h2 className="mb-2 text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <TrashIcon onDelete={() => onDelete(id)} />
        </div>
        
        {truncatedDescription && (
          <p className="mb-4 text-gray-300">
            {truncatedDescription}
          </p>
          
        )}
        <Link href={`/blog/${id}`} className='text-sm mb-3 underline'>Read more</Link>
        <div className="mb-4 flex items-center space-x-2 text-sm text-gray-400">
          <UserIcon className="h-4 w-4" />
          <span>{author? author: "Shashwat"}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{formateDate(publishedDate)}</span>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default BlogCard

