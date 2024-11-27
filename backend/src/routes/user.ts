import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { signInSchema, signUpSchema } from "../../types";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";


export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET : string
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
        c.json({message:"Validation Failed"})
        throw new Error("Validation failed")
        
    }
    try {
        const existingUser = await prisma.user.findFirst({
            where:{
                email: parsedData.data?.email,
            }
        })
        if(existingUser){
        c.status(400)
        c.json({message:"User already exist"})
        
        }
        const hashedPassword = await bcrypt.hash(parsedData.data?.password, 10)

        const user = await prisma.user.create({
            data:{
                email: parsedData.data?.email ?? "test",
                password: hashedPassword
            }
        })
    } catch (error) {
        
    }
})

userRouter.post('/signin', async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const parsedData = signInSchema.safeParse(body);
    if(!parsedData.success){
        c.status(400)
        throw new Error("Validation failed")
    }
    
    const user = await prisma.user.findFirst({
        where:{
            email: parsedData.data.email
        }
    })
    if(!user){
        c.json({message:"No user Found"}, 403)
        throw new Error
    }
    const valid = await bcrypt.compare(parsedData.data.password, user.password);
    if(!valid){
        c.json({message: "username or password incorrect"}, 403)
    }

    const token = await sign({email: user.email, password: user.password}, c.env.JWT_SECRET);
    return c.json({token : token})
})