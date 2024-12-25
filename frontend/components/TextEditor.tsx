"use client";

import {useEditor, EditorContent} from "@tiptap/react"

import {StarterKit} from "@tiptap/starter-kit"
interface EditorProps {
    content: string;
    onContentChange: (content: string) => void
}
const getProcessedText = (html: string) => {
  // Replace <p>...</p> with plain text and add line breaks
  return html
    .replace(/<p>/g, '')  // Remove opening <p> tags
    .replace(/<\/p>/g, '\n')  // Replace closing </p> tags with line breaks
    .replace(/<br\s*\/?>/g, '\n')  // Replace <br> tags with line breaks
    .trim(); // Remove any trailing newlines
};

// Example usage

export const TextEditor: React.FC<EditorProps> = ({content, onContentChange}) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content ?? <p>Write something</p>,
        onUpdate: ({editor}) => {
            let updatedContent = editor.getHTML();
                updatedContent = getProcessedText(updatedContent)
            onContentChange(updatedContent)
        }

    })

    return <div>
        {editor && <EditorContent editor={editor} className="text-black min-w-[400px] bg-white" />}
    </div>
}