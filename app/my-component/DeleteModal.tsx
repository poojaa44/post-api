
import React from 'react';
import axios from 'axios';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { useToast } from '@/hooks/use-toast';
const DeleteModal = (id:{id:number}) => {

const {toast} =useToast()
    const DeleteApi = async (id:{id:number})=>{
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id.id}`)
        console.log(response.status)
        toast({
            title:"Post Deleted successfully"
        })
    }

  return (
   <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button >Delete ⚠️</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            post and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=> DeleteApi(id)} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteModal