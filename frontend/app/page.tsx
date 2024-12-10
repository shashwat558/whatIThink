import BlogCard from "@/components/BlogCard";


export default function Home() {


  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="text-center">
          <h1 className="text-5xl tracking-tight border-b-[1.5px] border-b-gray-800 p-3">So, this is what i think</h1>
        </div>
        <BlogCard title={"This is title"} description={"This is description"} author={"Teeku"} readingTime={"1 min read"} publishedDate={"9/11"}/>

      </div>
      
    </div>
    
  );
}
