import { Hono } from "hono";


export const blogRouter = new Hono()



blogRouter.post('/', (c) => {
    return c.text("Blog route")
})


blogRouter.get('/bulk', (c) => {
    return c.text("here are all your Blogs")
})