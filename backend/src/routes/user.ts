import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { signInSchema, signUpSchema } from "../../types";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
    }
}>;

userRouter.post('/signup',async  (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const parsedData = signUpSchema.safeParse(body);
    if(!parsedData.success){
        c.status(403)
        c.text("Validation Failed")
    }
    try {
        const existingUser = await prisma.user.findFirst({
            where:{
                email: parsedData.data?.email,
            }
        })
        if(existingUser){
            
        }
    } catch (error) {
        
    }
})

userRouter.post('/signin', (c) =>{
    return c.text("signin route")
})