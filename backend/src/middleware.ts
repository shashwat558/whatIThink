import { Next } from "hono";
import { verify } from "hono/jwt";

export default async function authMiddleware(c: any, next:Next){
    const adminEmail = c.env.ADMIN_EMAIL;
    const adminPassword = c.env.ADMIN_PASSWORD;
    
    const authHeader = c.req.headers["authorization"];
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return c.json({message: "unauthorized"});
    }
    const token = authHeader.split(" ")[1];
    
    try {
        const payload = await verify(token, c.env.JWT_SECRET);

        if(payload.email === adminEmail && payload.password === adminPassword){
            return next()

        } else {
            // Unauthorized access, send 403 status
            return c.json({ message: "Access Denied" }, 403);
        }
        


        
    } catch (error) {
        console.error(error); // Log error for debugging
        return c.json({ message: "Invalid or expired token" }, 401);
    }
    

}