'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { isAdmin } from '@/lib/utils'
import { notFound, useRouter } from 'next/navigation'
import axios from 'axios'
import { Icons } from '@/components/icon'
// import { TextEditor } from '@/components/TextEditor'

// import { TextEditor } from '@/components/TextEditor'

import Tiptap from '@/components/tiptap'


        


const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function BlogCreationPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [admin, setAdmin] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter()

  useEffect(() => {
    setAdmin(isAdmin());
  },[])

  if(admin == false) return notFound();

  return (
    <div className="min-h-screen overflow-hidden  text-white flex items-center justify-center p-4 w-full">
      <Card className="w-import {Editor, EditorState} from 'draft-js';full backdrop-blur-sm bg-transparent w-[60pc] fixed">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Create a New Blog Post</CardTitle>
          <CardDescription className="text-gray-400">Share your thoughts with the world</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-200">Title</label>
            <Input
              id="title"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2 flex flex-col overflow-y-scroll w-full h-full">
            <label htmlFor="description" className="text-sm font-medium text-gray-200">Description</label>
            {/* <TextEditor content={description} onContentChange={setDescription}/> */}
            <Tiptap content={description} onChange={(e) => setDescription(e)} />

            

            
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={async() => {

             try {
                setIsLoading(true);
                const res = await axios.post(`${BASE_API_URL}/api/v1/blog`,{
                    title: title,
                    description: description
                  },{
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                  });
                  
                  router.push(`/blog/${res.data.Blog.id}`)
             } catch (error) {
                console.log(error)
                
             }
            setIsLoading(false);


          }
          
          }  className="w-full bg-white text-black hover:bg-gray-200">
            {isLoading?<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />: ""}
            Publish
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

