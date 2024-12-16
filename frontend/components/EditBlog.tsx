'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Textarea } from './ui/textarea';


const EditBlogForm = ({ blog }: { blog: { id: number; title: string; description: string } }) => {
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8787/api/v1/blog/${blog.id}`, { title, description }, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      router.push(`/blog/${blog.id}`); 
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2 bg-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <Textarea
              id="description"
              placeholder="Write your blog content here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              className="min-h-[400px] bg-black border-gray-500 text-white placeholder-gray-500"
            />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
};

export default EditBlogForm;
