'use client'
import axios from "axios";

import { useEffect, useState } from "react";
import Modal from "./my-component/Modal";
import PostModal from "./my-component/PostModal";
import UpdatePostModal from "./my-component/UpdateModal";
import DeleteModal from "./my-component/DeleteModal";

interface Posts {
  id:number,
  title:string,
  body:string
}

export default function Home() {
  const [posts, setPOSTS] = useState<Posts[]>([])
     const [loader, setLoader] = useState(false)

  useEffect( ()=>{
    const fetchPost = async()=>{
      try {
        setLoader(true)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
          console.log( response.data)
          setPOSTS(response.data)
          setLoader(false)
      } catch (error) {
        console.log(error)
        
      }
 }
 fetchPost()
  },[])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="flex justify-between w-full" ><h1>POSTS</h1> <PostModal/></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 place-content-center relative" >
    {
      loader &&
      <div className='flex justify-center items-center h-full absolute inset-0 lg:text-3xl ' ><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" strokeWidth="2" d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"><animateTransform attributeName="transform" attributeType="XML" dur="560ms" from="0,12,12" repeatCount="indefinite" to="360,12,12" type="rotate"/></path></svg></div>
    }
      {
        posts.map((post,i)=>{
          return <div key={post.id} className=" bg-teal-300 h-[300px] text-black flex flex-col justify-center items-center p-4 rounded-xl cursor-pointer  " >
            <h2 className="uppercase mb-4 font-bold text-center" >{post.title}</h2>
            {/* <p className="text-center" >{post.body}</p> */}
            <div className="flex justify-center max-sm:flex-col max-sm:items-center w-full gap-3 " >
          
              <div className="flex gap-2 flex-wrap items-center justify-center" >
              <div><Modal id={post.id}/></div>
              <UpdatePostModal id={post.id} />
              <DeleteModal id={post.id} />
              </div>
            </div>

          </div>
        })
      }

    </div>



    </div>
  );
}
