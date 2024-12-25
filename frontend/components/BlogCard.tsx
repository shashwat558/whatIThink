import React from 'react'
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import Link from 'next/link'
import { formateDate, isAdmin } from '@/lib/utils'
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
      : description;

  return (
    <div className="relative overflow-hidden text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] transition-all hover:shadow-lg w-full sm:max-w-[380px] md:max-w-[500px] lg:max-w-[600px] min-h-[250px]">
      <div className="relative z-10 p-6">
        <div className="flex justify-between flex-wrap">
          <h2 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight">
            {title}
          </h2>
          {isAdmin() ? <TrashIcon onDelete={() => onDelete(id)} /> : ""}
        </div>

        {truncatedDescription && (
          <p className="mb-4 text-gray-300 text-sm sm:text-base">
            {truncatedDescription}
          </p>
        )}
        
        <Link href={`/blog/${id}`} className='text-sm mb-3 underline'>
          Read more
        </Link>

        <div className="mb-4 flex items-center space-x-2 text-sm text-gray-400">
          <UserIcon className="h-4 w-4" />
          <span className="text-xs sm:text-sm">{author ? author : "Shashwat"}</span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
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
  );
}

export default BlogCard;
