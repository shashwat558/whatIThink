import { Hono } from "hono";
import authMiddleware from "../middleware";


export const blogRouter = new Hono()



blogRouter.post('/', authMiddleware, (c) => {
    return c.text("Blog route")
})


blogRouter.get('/bulk', (c) => {
    return c.text("here are all your Blogs")
})