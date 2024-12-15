"use client";

import { Textarea } from '@/components/ui/textarea'
import { isAdmin } from '@/lib/utils'
import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Blog{
    title: string,
    description: string
}

const handleSubmit = async () => {
    
}

const Page = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [admin, setAdmin] = useState<boolean>()
    useEffect(() => {
        setAdmin(isAdmin());


    },[])

    console.log(admin);

    if(admin == false) return notFound();    

  return (
    
    <div className='w-full h-full'>
        <div className='flex flex-col justify-center items-center h-full w-full'>
        <h1 className='text-2xl text-gray-500 text-right'>Write a Blog...</h1>
        
        
        
    </div>
    </div>
  )
}

export default Page;