import { Hono } from "hono";
import authMiddleware from "../middleware";
import { blogSchema, updateBlogSchema } from "../../types";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string
    }
}>

blogRouter.use('/api/v1/blog/*', async (c, next) => {
    await next()
  })

blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate()
)

    const body = await c.req.json();
    const parsedData  = blogSchema.safeParse(body);
    if(!parsedData.success){
        return c.json({message: "Validation failed"}, 400);
    }
    

    try {
        const description = parsedData.data.description;
        const words = description.split(" ").length;
        const readingTime = Math.ceil(0.08 * words)
        const blog = await prisma.blog.create({
            data:{
                title: parsedData.data.title,
                description: parsedData.data.description,
                readingTime: readingTime,
            }
        })

        return c.json({
            message: "Blog created",
            Blog: blog
        }, 200)


        
    } catch (error) {
        console.log(error)
        return c.json({
            message:"Internal server error"
        }, 500)
        
    }
    
    
})

blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.blog.findFirst({
        where:{
            id: Number(id)
        }, 
        select:{
            id: true,
            title: true,
            description: true,
            readingTime: true,
            publishedDate: true,


        }
    })
    return c.json({
        blog: blog
    },200)
}) 

//TODO:fix the bulk endpoint
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany({
        select:{
            id: true,
            title: true,
            description: true,
            publishedDate: true,
            readingTime: true
        }
    })
    return c.json({
        blogs: blogs
    }, 200)
})

blogRouter.delete("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const blogId = c.req.param("id");

    const blog = await prisma.blog.delete({
        where: {
            id: Number(blogId)
        }
    })
    return c.json({message: "Blog deleted succesfully"}, 200)
    } catch (error) {
        console.log(error)
        return c.json({message: "Internal server error"}, 500

        )
    }
    
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const parsedData = updateBlogSchema.safeParse(body);
    if(!parsedData.success){
        return c.json({message: "Validation failed"}, 400)
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogToUpdate = await prisma.blog.update({
        where: {
            id: parsedData.data.id
        },
        data:{
            title: parsedData.data.title,
            description: parsedData.data.description,
        }
    })
    return c.json({message: "Updated blog succesfully ", updatedBlog: blogToUpdate}, 200)
})
