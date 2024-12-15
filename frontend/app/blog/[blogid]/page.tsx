

import GoBackButton from '@/components/GoBackButton';
import { formateDate } from '@/lib/utils';
import axios from 'axios';

import React from 'react'

const getBlogPost = async ({blogid}: {blogid: number}) => {
  try {
    const response = await axios.get(`http://localhost:8787/api/v1/blog/${blogid}`)
  const blog = response.data.blog;
  return blog;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch the blog")
    
  }
}


const Page = async ({ params }: { params: { blogid: number } }) => {
  const id = await params.blogid;
  const blog = await getBlogPost({blogid: Number(id)});
  console.log(blog)

  return (
    <article className="mt-10 max-w-2xl mx-auto px-4 py-12">
     <div className='absolute top-10 left-4'>
     <GoBackButton />
     </div>
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="text-sm text-gray-500 flex items-center space-x-4">
        <time dateTime={blog.publishedDate}>{formateDate(blog.publishedDate)}</time>
        <span>•</span>
        <span>{blog.readingTime} min read</span>
      </div>
    </header>
    <div className="prose max-w-none">
      <p className="text-lg text-gray-400 leading-relaxed">{blog.description}</p>
    </div>
  </article>
  );
};
export default Page;