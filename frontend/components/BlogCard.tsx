
import { Blog } from "@/types/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { CalendarIcon, ClockIcon, UserIcon, Trash2 } from "lucide-react";
import { cn, formateDate } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps extends Blog {
  onDelete: (id: string) => void;
  author?: string;
}

const BlogCard = ({ 
  id, 
  title, 
  description, 
  publishedDate, 
  readingTime, 
  onDelete, 
  author = "Shashwat" 
}: BlogCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Failed to delete blog:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  
  
  const truncatedDescription = description && description.length > 100
    ? `${description.substring(0, 100)}...`
    : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br  p-[1px] transition-all duration-300 hover:scale-[1.01]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-[-1px] rounded-xl  opacity-10 blur-xl transition-all duration-500 group-hover:opacity-20" />
      
      <div className="relative rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 h-full">
        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 bg-clip-text text-transparent ">
              {title}
            </h2>
            
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "text-gray-400 hover:text-red-500 hover:bg-red-900/20 rounded-full transition-all duration-300",
                isHovering ? "opacity-100" : "opacity-0"
              )}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className={cn("h-4 w-4", isDeleting && "animate-pulse")} />
            </Button>
          </div>

          {truncatedDescription && (
            <div dangerouslySetInnerHTML={{ __html: truncatedDescription}} // Correct usage
        style={{ whiteSpace: 'pre-wrap' }} className="mb-4 text-gray-300/90 text-sm sm:text-base leading-relaxed prose max-w-none " />

          )}
          <Link href={`/blog/${id}`}>
           <motion.p 
            // href={`/blog/${id}`}
            whileHover={{ x: 5 }}
            className="inline-block text-sm mb-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Read more →
          </motion.p>
          </Link>
          

          <div className="space-y-3 text-gray-400/90">
            <div className="flex items-center space-x-2 text-sm">
              <UserIcon className="h-4 w-4 text-blue-400/80" />
              <span className="text-xs sm:text-sm">{author}</span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm border-t border-gray-700/50 pt-3">
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-4 w-4 text-purple-400/80" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-pink-400/80" />
                <span>{formateDate(publishedDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;