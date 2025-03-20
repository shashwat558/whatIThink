"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { Toolbar } from "./ToolBar"
import Heading from "@tiptap/extension-heading"

export default function Tiptap({
    content,
    onChange
}: {
    content: string
    onChange : (richText: string) => void
}){

    const editor = useEditor({
        extensions: [StarterKit.configure({

        }), Heading.configure({
            HTMLAttributes: {
                class: "text-xl font-bold",
                level: [2]
            }
            
        })],
        content: content,
        editorProps: {
            attributes: {
                class: 
                   "rounded-md border min-h-[150px] border-input bg-black"
            }
        },
        onUpdate({editor}){
            onChange(editor.getHTML())
            console.log(editor.getHTML())
        }
    })

    return (
        <div className="flex flex-col justify-stretch min-h-[250px] text-white ">
            <Toolbar editor={editor}/>
            <EditorContent editor={editor} className=""/>
        </div>
    )

}