import React from 'react';
import GoBackButton from '@/components/GoBackButton';
import axios from 'axios';
import EditBlogForm from '@/components/EditBlog';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



const getBlogPost = async (blogid: number) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/v1/blog/${blogid}`);
    return response.data.blog;
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    throw new Error('Failed to fetch blog');
  }
};




const EditBlogPage = async ({ params }: { params: { blogid: number } }) => {
  
  const id = await Number(params.blogid);
  const blog = await getBlogPost(id);

 

  return (
    <article className="mt-10 max-w-2xl mx-auto px-4 py-12">
      <div className="absolute top-10 left-4">
        <GoBackButton />
      </div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Blog</h1>
      </header>
      {/* Pass blog data to the client component */}
      <EditBlogForm blog={blog} />
    </article>
  );
};

export default EditBlogPage;
