"use client"
import { type Editor } from "@tiptap/react"
import { Toggle } from "./ui/toggle"
import { Bold, Code, Heading2, Italic, List, ListOrdered, Strikethrough } from "lucide-react"

type Props = {
    editor: Editor | null
}
export function Toolbar({editor}: Props){
    if(!editor){
        return null
    }

    return <div className="border border-input bg-transparent rounded-lg text-white">
        <Toggle 
        size={"sm"}
        pressed={editor.isActive("heading")}
        onPressedChange={() => {
            editor.chain().focus().toggleHeading({level: 2}).run()
        }}
        >
        <Heading2 className="h-4 w-4"/>
        </Toggle>
        <Toggle 
        size={"sm"}
        pressed= {editor.isActive("Italic")}
        onPressedChange={() => {
            editor.chain().focus().toggleItalic().run()
        }}
        >
            <Italic className="h-4 w-4"/>
        </Toggle>
        <Toggle 
        size={"sm"}
        pressed= {editor.isActive("Bold")}
        onPressedChange={() => {
            editor.chain().focus().toggleBold().run()
        }}
        >
            <Bold className="h-4 w-4"/>
        </Toggle>
        <Toggle 
        size={"sm"}
        pressed= {editor.isActive("Strike")}
        onPressedChange={() => {
            editor.chain().focus().toggleStrike().run()
        }}
        >
            <Strikethrough className="h-4 w-4"/>
        </Toggle>
        <Toggle 
        size={"sm"}
        pressed= {editor.isActive("List")}
        onPressedChange={() => {
            editor.chain().focus().toggleBulletList().run()
        }}
        >
            <List className="h-4 w-4"/>
        </Toggle>
        <Toggle 
        size={"sm"}

        pressed= {editor.isActive("orderedList")}
        onPressedChange={() => {
            editor.chain().focus().toggleOrderedList().run()
        }}
        >
            <ListOrdered className="h-4 w-4"/>
        </Toggle>
        <Toggle 
        size={"sm"}
        pressed= {editor.isActive("Code")}
        onPressedChange={() => {
            editor.chain().focus().toggleCode().run()
        }}
        >
            <Code className="h-4 w-4"/>
        </Toggle>









    </div>
}