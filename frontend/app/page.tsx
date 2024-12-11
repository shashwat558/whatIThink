"use client"
import BlogCard from "@/components/BlogCard";
// import { blogState } from "@/state/state";
import { Blog } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useRecoilValue, useSetRecoilState } from "recoil";

// interface Blog{
//   id: string;
//   title: string;
//   description: string;
//   publishedDate: Date;
//   readingTime: number;

// }



export default function Home() {
  // const setBlogs = useSetRecoilState(blogState);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs(){
      try {
        const response = await axios.get("http://localhost:8787/api/v1/blog/bulk");
        const blogs= response.data.blogs;
        setBlogs(blogs)
        console.log(blogs)
      } catch (error) {
        console.log(error)
        
      }
      
    }
    fetchBlogs()
  },[setBlogs])


  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <div className="flex flex-col justify-center items-start absolute top-[100px] left-[400px]">
        <div className="">
          <h1 className="text-5xl tracking-tight border-b-[1.5px] border-b-gray-800 p-3">So, this is what i think</h1>
        </div>
        <div className="mt-4">
        
        {blogs.map((blog) => (
      <BlogCard 
        id={blog.id}
        key={blog.id}
        title={blog.title}
        description={blog.description}
        publishedDate={blog.publishedDate}
        readingTime={blog.readingTime}
      
      />
    ))}
  </div>
        </div>

      </div>
      
  
    
  );
}

