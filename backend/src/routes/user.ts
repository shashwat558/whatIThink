import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { signInSchema, signUpSchema } from "../../types";

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
        
        return c.json({message:"Validation Failed"},400)
        
        
    }
    console.log("reached here")
    try {
        const existingUser = await prisma.user.findFirst({
            where:{
                email: parsedData.data?.email,
            }
        })
        if(existingUser){
        
        return c.json({message:"User already exist"}, 400)
        
        }
        

        const user = await prisma.user.create({
            data:{
                email: parsedData.data?.email ?? "test",
                password: parsedData.data.password,
                
            }
        })
        return c.json(user, 200)
    } catch (error) {
        console.log(error)
        return c.json({message:"caught some error"},500)
        
    }
})

userRouter.post('/signin', async (c) =>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const parsedData = signInSchema.safeParse(body);
    if(!parsedData.success){
        console.log("Fucked here")
        return c.json({message: "Validation failed"}, 400)        
    }

    
    const user = await prisma.user.findFirst({
        where:{
            email: parsedData.data.email,
            
        }
    })
    console.log(user)
    console.log("Reached here")
    if(!user){
        console.log("reached here")
        return c.json({message:"No user Found"}, 403)
        
    }
    
    
    console.log("reached here")

    const token = await sign({email: user.email, password: user.password, role: user.role}, c.env.JWT_SECRET);
    return c.json({token : token})
})