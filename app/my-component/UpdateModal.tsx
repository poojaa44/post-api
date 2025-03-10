import React, {  useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useToast } from '@/hooks/use-toast';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const UpdatePostModal = (id:{id:number}) => {

  
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {toast} = useToast()

  // console.log(post?.title)
  const fetchParticularPost  = async (id: { id: number })=>{
 
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id.id}`)
      setTitle(response.data.title)
      setBody(response.data.body)
        
    } catch (error) {
        console.log(error)
    }
}

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    setError(null);

    try {
      const newPost: Post = {
        id:1,
        title,
        body,
        userId: 1, // Default user ID
      };
      console.log(newPost)

      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id.id}`, newPost);
      

      // Handle successful post creation
      setTitle('');
      
      setBody('');
      setIsLoading(false);
      setIsOpen(false); 
      toast({
        title:"Post edited successfully"
      })
      console.log('Post updated successfully:', response.data); 
      setIsOpen(false)
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to edit post. Please try again.');
      setIsLoading(false);
    }
  };

  return (
   
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogTrigger asChild>
          <Button onClick={()=> fetchParticularPost(id)} >Edit</Button>
        </DialogTrigger>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}> 
            <div>
              <label htmlFor="title">Title:</label>
              <input 
                type="text" 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full border rounded-md p-2" 
              />
            </div>
            <div>
              <label htmlFor="body">Body:</label>
              <textarea 
                id="body" 
                value={body} 
                onChange={(e) => setBody(e.target.value)} 
                className="w-full border rounded-md p-2 h-24" 
              />
            </div>
            <div>
              <button type="submit" className='bg-[#020817] text-white px-6 py-2 rounded-xl'  disabled={isLoading}> 
                {isLoading ? 'Updating...' : 'Submit'} 
              </button> 
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </DialogContent>
      </Dialog>
   
  );
};

export default UpdatePostModal;