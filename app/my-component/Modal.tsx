import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { IoIosArrowDown } from "react-icons/io";

const Modal = (id:{id:number}) => {

    const [singlepost, setSinglePost] = useState<{id:number, title:string,body:string}>()
    const [loader, setLoader] = useState(false)
    const [loader2, setLoader2] = useState(false)
    const[comments, setComments] = useState<{id:number, name:string,email:string,body:string}[]>([])
    const[showComments, setShowComments] = useState(false)

        const fetchParticularPost  = async (id: { id: number })=>{
            setLoader(true)
            console.log(id)
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id.id}`)
                setSinglePost(response.data)
                setLoader(false)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchParticularComments  = async (id: { id: number })=>{
            setLoader2(true)
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id.id}/comments`)
                setComments(response.data)
                setLoader2(false)
            } catch (error) {
                console.log(error)
            }
        }
        
        
  return (
    <section >
<Dialog>
  <DialogTrigger asChild><Button onClick={()=> fetchParticularPost(id)} >Open</Button></DialogTrigger>

  <DialogContent className=' flex flex-col items-center justify-center' >
    {loader ? <div className='flex justify-center items-center' ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" strokeWidth="2" d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"><animateTransform attributeName="transform" attributeType="XML" dur="560ms" from="0,12,12" repeatCount="indefinite" to="360,12,12" type="rotate"/></path></svg></div>:
    <DialogHeader>
      <DialogTitle>{singlepost?.title}</DialogTitle>
      <DialogDescription>
        <p className='text-purple-700' >{singlepost?.body}</p>
        <div>
            <div className={``}>
                <p onClick={()=>{fetchParticularComments(id); setShowComments((prev)=> !prev)}} className='cursor-pointer flex items-end  gap-1 my-3' >show comments <span className={` duration-300 ${showComments ? 'rotate-180':'rotate-0'} `} ><IoIosArrowDown/></span> </p>
                <div className={`flex flex-col gap-3  ${showComments?" h-[200px] overflow-y-auto":" h-auto duration-300"}`} >
                    {
                        loader2 ?
                        <div className='flex justify-center items-center' ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" strokeWidth="2" d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"><animateTransform attributeName="transform" attributeType="XML" dur="560ms" from="0,12,12" repeatCount="indefinite" to="360,12,12" type="rotate"/></path></svg></div>
                        :''
                    }
                    {
                        showComments && 
                        comments?.map((comment,i)=>{
                            return <div className='' >
                                    <div><div className='' ><span className='font-bold ' > {comment.email}</span></div></div>
                                    <div>{comment.body}</div>
                            </div>
                        })
                    }
                </div> 
            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
    }
  </DialogContent>
</Dialog>

    </section>
  )
}

export default Modal