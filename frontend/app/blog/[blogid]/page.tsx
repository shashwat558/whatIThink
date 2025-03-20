

import GoBackButton from '@/components/GoBackButton';
import { formateDate} from '@/lib/utils';
import axios from 'axios';
import React from 'react'

import BlogActions from '@/components/BlogAction';
const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getBlogPost = async ({blogid}: {blogid: number}) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/v1/blog/${blogid}`)
  const blog = response.data.blog;
  return blog;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch the blog")
    
  }
}


const Page = async ({params}:{params:Promise<{blogid: number}>}) => {
  
  
 
  const { blogid }  = await params
  const blog = await getBlogPost({blogid: blogid});

  

  return (
    <article className="mt-10 max-w-2xl mx-auto px-4 py-12">
     <div className=' top-10 left-4 z-10 sticky'>
     <GoBackButton />
     </div>
    <header className="mb-8">
      <div className='flex justify-between'>
        
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <BlogActions id={blog.id}/>
      </div>
      <div className="text-sm text-gray-500 flex items-center space-x-4">
        <time dateTime={blog.publishedDate}>{formateDate(blog.publishedDate)}</time>
        <span>•</span>
        <span>{blog.readingTime} min read</span>
      </div>
    </header>
    <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.description }} // Correct usage
        style={{ whiteSpace: 'pre-wrap' }}
      />
    
  </article>
  );
};
export default Page;