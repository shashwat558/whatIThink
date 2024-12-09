import React from 'react'

const BlogCard = ({title, description,author, readingTime, publishedDate}:{
    title: string;
    description: string;
    readingTime: string;
    publishedDate: string;
    author: string
}) => {
    const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;
  return (
    <div className='flex flex-col items-center'>
        <h1>{title}</h1>
        <div>
            <p>{truncatedDescription}</p>

            
        </div>   
        <div className=''>
            Published By: {author}
        </div>     
        <div className='flex gap-5 justify-around item-center'>
            <div>{readingTime}</div>
            <div>.</div>
            <div>{publishedDate}</div>            
        </div>
       
    </div>
  )
}

export default BlogCard