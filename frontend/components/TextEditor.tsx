"use client";

import {useEditor, EditorContent} from "@tiptap/react"

import {StarterKit} from "@tiptap/starter-kit"
interface EditorProps {
    content: string;
    onContentChange: (content: string) => void
}

export const TextEditor: React.FC<EditorProps> = ({content, onContentChange}) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content ?? <p>Write something</p>,
        onUpdate: ({editor}) => {
            let updatedContent = editor.getHTML();
                updatedContent = updatedContent.replace(/<p>(\s|&nbsp;)*<\/p>/g, '');
            onContentChange(updatedContent)
        }

    })

    return <div>
        {editor && <EditorContent editor={editor} className="text-black min-w-[400px] bg-white" />}
    </div>
}