"use client"
import BlogCard from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Blog } from "@/types/types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { BookOpen } from "lucide-react";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  
  const handleDelete = async(id: string) => {
    try {
      await axios.delete(`${BASE_API_URL}/api/v1/blog/${id}`);
      setBlogs((prev) => prev.filter((blog) => {return blog.id !== id}));
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchBlogs(){
      try {
        const response = await axios.get(`${BASE_API_URL}/api/v1/blog/bulk`);
        const blogs = response.data.blogs;
        setBlogs(blogs)
        console.log(blogs)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBlogs()
  },[setBlogs])

  const filteredBlogs = useMemo(() => {
    return blogs.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, blogs]);

  return (
    <div className="min-h-screen animate-gradient-x">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12 animate-fade-in">
          {/* Header Section */}
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center justify-center space-x-3">
              <BookOpen className="h-8 w-8 text-gray-100 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-100 animate-title">
                So, this is what I think
              </h1>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in">
              Explore my thoughts, ideas, and experiences through these carefully crafted blog posts.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-md mx-auto animate-slide-up">
            <Input 
              className="w-full h-12 px-4 bg-gray-900/50 border-gray-800 text-gray-100 
                         placeholder:text-gray-500 rounded-xl transition-all duration-300
                         focus:bg-gray-900/80 focus:border-gray-700 focus:ring-0"
              placeholder="Search posts..."
              type="text"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredBlogs.map((blog, index) => (
              <div key={blog.id} 
                   className="" 
                   style={{ animationDelay: `${index * 100}ms` }}>
                <BlogCard 
                  id={blog.id}
                  title={blog.title}
                  description={blog.description}
                  publishedDate={blog.publishedDate}
                  readingTime={blog.readingTime}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-lg text-gray-500">
                No posts found. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}