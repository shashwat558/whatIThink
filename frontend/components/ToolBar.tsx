"use client"
import { type Editor } from "@tiptap/react"
import { Toggle } from "./ui/toggle"
import { Bold, Code, Heading2, Italic, Link, List, ListOrdered, Redo, Strikethrough, Underline, Undo } from "lucide-react"

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
        <Heading2 className="h-5 w-5"/>
        </Toggle>
        <Toggle 
        size={"sm"}
        pressed= {editor.isActive("Italic")}
        onPressedChange={() => {
            editor.chain().focus().toggleItalic().run()
        }}
        >
            <Italic className="h-5 w-5"/>
        </Toggle>
        <Toggle 
        size={"sm"}
        pressed= {editor.isActive("Bold")}
        onPressedChange={() => {
            editor.chain().focus().toggleBold().run()
        }}
        >
            <Bold className="h-5 w-5"/>
        </Toggle>
        <Toggle 
        size={"sm"}
        pressed= {editor.isActive("Strike")}
        onPressedChange={() => {
            editor.chain().focus().toggleStrike().run()
        }}
        >
            <Strikethrough className="h-5 w-5"/>
        </Toggle>
        <Toggle 
        size={"sm"}
        pressed= {editor.isActive("bulletList")}
        onPressedChange={() => {
            editor.chain().focus().toggleBulletList().run()
        }}
        >
            <List className="h-5 w-5"/>
        </Toggle>
        <Toggle 
        size={"sm"}

        pressed= {editor.isActive("orderedList")}
        onPressedChange={() => {
            editor.chain().focus().toggleOrderedList().run()
        }}
        >
            <ListOrdered className="h-5 w-5"/>
        </Toggle>
        <Toggle 
        size={"sm"}
        pressed= {editor.isActive("CodeBlock")}
        onPressedChange={() => {
            editor.chain().focus().toggleCodeBlock().run()
        }}
        >
            <Code className="h-5 w-5"/>
        </Toggle>
        <Toggle
         size={"sm"}
         pressed={editor.isActive("HorizontalLine")}
         onPressedChange={() => {
            editor.chain().focus().setHorizontalRule().run()
         }}
        >
            ---
        </Toggle>

        <Toggle
          size={"sm"}
          pressed={editor.isActive("Link")}
          onPressedChange={() => {
            const url = prompt("Add url");
            if(url){

                editor.chain().focus().extendMarkRange("link").setLink({href: url}).run()

            }
            
          }}
        >
         <Link className="w-5 h-5"/>
        </Toggle>
        
 
         <Toggle
         size={"sm"}
         pressed={editor.isActive("undo")}
         onPressedChange={() => {
            
            editor.chain().focus().undo().run();
          }}
         
        >
          <Undo className="w-5 h-5" />
        </Toggle>
        <Toggle
        size={"sm"}
        pressed={editor.isActive("redo")}

          onPressedChange={() => {
            
            editor.chain().focus().redo().run();
          }}
          
        >
          <Redo className="w-5 h-5" />
        </Toggle>
        <Toggle
        size={"sm"}
        pressed={editor.isActive("underline")}
        onPressedChange={() => {
            editor.chain().focus().toggleUnderline().run()
        }}
        >
            <Underline className="w-5 h-5"/>

        </Toggle>









    </div>
}