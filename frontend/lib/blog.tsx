// import axios from 'axios';
// import { serialize } from 'next-mdx-remote/serialize';
// import { MDXRemoteSerializeResult } from 'next-mdx-remote';

// const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export const getBlogPost = async ({ blogid }: { blogid: number }) => {
//   try {
//     const response = await axios.get(`${BASE_API_URL}/api/v1/blog/${blogid}`);
//     const blog = response.data.blog;

//     // Serialize MDX content
//     const mdxSource: MDXRemoteSerializeResult = await serialize(blog.content);
//     console.log(mdxSource)
//     return { mdxSource, metadata: blog };
//   } catch (error) {
//     console.log(error);
//     throw new Error('Failed to fetch the blog');
//   }
// };
