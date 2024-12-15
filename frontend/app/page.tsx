"use client"
import BlogCard from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
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
  const [searchText, setSearchText] = useState<string>("");
  
  const handleDelete = async(id: string) => {
    try {
      await axios.delete(`http://localhost:8787/api/v1/blog/${id}`);
      setBlogs((prev) => prev.filter((blog) => {blog.id !== id}));
  
    
    }catch(error){
      console.log(error)
    }
  
  }

  

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

  const filteredBlogs = blogs.filter(blog => {
    return blog.title.toLowerCase().includes(searchText.toLowerCase());
  })


  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <div className="flex flex-col justify-center items-start absolute top-[100px] left-[400px]">
        <div className="">
          <h1 className="text-5xl tracking-tight border-b-[1.5px] border-b-gray-800 p-3">So, this is what i think</h1>
        </div>
        <div>
          <Input placeholder="Search..." type="text" value={searchText} onChange={e => setSearchText(e.target.value)}/>
        </div>
        <div className="mt-4">
        
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

