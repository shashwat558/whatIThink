
import { z } from '@hono/zod-openapi'

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const blogSchema = z.object({
    title: z.string(),
    description : z.string()
})

export const updateBlogSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
})