"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"


import UnderLine from "@tiptap/extension-underline"
import CodeBlockLowLight from "@tiptap/extension-code-block-lowlight"

import Heading from "@tiptap/extension-heading"
import { Toolbar } from "./ToolBar"
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight'
import React from 'react'




// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all)

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

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
            
        }),
        UnderLine,
        CodeBlockLowLight.configure({
          lowlight,
          HTMLAttributes: {
            class: "blue-code-block"
          }
        })
    ],
        content: content,
        editorProps: {
            
            attributes: {
                class: 
                   "rounded-md border-[1.2px] min-h-[350px] max-h-[350px] backdrop-blur-md p-4 overflow-scroll"
            }
        },
        onUpdate({editor}){
            onChange(editor.getHTML())
            console.log(editor.getHTML())
        }
        
    })

    return (
        <div className="flex flex-col justify-stretch min-h-[250px] text-white ">
            <Toolbar editor={editor} />
            <div>

            <EditorContent editor={editor} style={{whiteSpace: "pre-line"}} className="prose"/>
            </div>
        </div>
    )

}