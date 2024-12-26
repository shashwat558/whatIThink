"use client"
import BlogCard from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
// import { blogState } from "@/state/state";
import { Blog } from "@/types/types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";


// import { useRecoilValue, useSetRecoilState } from "recoil";

// interface Blog{
//   id: string;
//   title: string;
//   description: string;
//   publishedDate: Date;
//   readingTime: number;

// }


const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function Home() {
 
   // const setBlogs = useSetRecoilState(blogState);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  
  const handleDelete = async(id: string) => {
    try {
      await axios.delete(`${BASE_API_URL}/api/v1/blog/${id}`);
      setBlogs((prev) => prev.filter((blog) => {return blog.id !== id}));
  
    
    }catch(error){
      console.log(error)
    }
  
  }

  

  useEffect(() => {
    async function fetchBlogs(){
      try {
        const response = await axios.get(`${BASE_API_URL}/api/v1/blog/bulk`);
        const blogs= response.data.blogs;
        setBlogs(blogs)
        console.log(blogs)
      } catch (error) {
        console.log(error)
        
      }
      
    }
    fetchBlogs()
  },[setBlogs])

  const filteredBlogs= useMemo(() => {
    return blogs.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, blogs]);


  return (
    <div className="flex justify-center items-center w-screen md:h-screen sm:overflow-y-scroll min-h-screen overflow-x-hidden">
      <div className="flex flex-col justify-center items-start absolute md:top-[100px] md:left-[400px] mt-5  mb-10 top-[30px]">
        <div className="">
          <h1 className="md:text-5xl text-3xl font-semibold md:font-normal tracking-tight border-b-[1.5px] border-b-gray-800 p-3">So, this is what i think</h1>
        </div>
        <div className="ml-3 mt-2">
          <Input placeholder="Search..." type="text" value={searchText} onChange={e => setSearchText(e.target.value)}/>
        </div>
        <div className="mt-4 flex gap-4 flex-wrap m-2">
        
        {filteredBlogs.map((blog) => (
      <BlogCard 
        id={blog.id}
        key={blog.id}
        title={blog.title}
        description={blog.description}
        publishedDate={blog.publishedDate}
        readingTime={blog.readingTime}
        onDelete={handleDelete}
      
      />
    ))}
  </div>
        </div>

      </div>
      
  
    
  );
}

