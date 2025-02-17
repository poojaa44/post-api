import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const CreatePostModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    setError(null);

    try {
      const newPost: Post = {
        id:11,
        title,
        body,
        userId: 11, // Default user ID
      };

      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);

      // Handle successful post creation
      setTitle('');
      setBody('');
      setIsLoading(false);
      setIsOpen(false); 
      console.log('Post created successfully:', response.data); 
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
      setIsLoading(false);
    }
  };

  return (

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button >Create Post</Button>
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
                {isLoading ? 'Creating...' : 'Submit'} 
              </button> 
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </DialogContent>
      </Dialog>
 
  );
};

export default CreatePostModal;