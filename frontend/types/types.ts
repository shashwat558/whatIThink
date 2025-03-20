import z from "zod";

export const blogSchema = z.object({
    title: z.string().max(50).nonempty("Text is required"),
    description: z.string().nonempty("Text is required")
})

export interface Blog {
    id: string;
    title: string;
    description: string;
    publishedDate: string;
    readingTime: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
    role: string;
}

