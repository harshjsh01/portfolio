import { useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl?: string;
}

const DEMO_BLOG: BlogPost = {
  id: 'demo-1',
  title: 'Welcome to My Portfolio Blog',
  excerpt: 'This is a demo blog post to show you how the blog system works.',
  content: 'Hello World! This is my first blog post on the new system. It supports markdown-like text, but for now it just displays plain text. You can edit or delete this from the admin panel.',
  date: new Date().toISOString(),
  imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('harsh-blogs');
    if (saved) {
      setBlogs(JSON.parse(saved));
    } else {
      setBlogs([DEMO_BLOG]);
      localStorage.setItem('harsh-blogs', JSON.stringify([DEMO_BLOG]));
    }
  }, []);

  const saveBlogs = (newBlogs: BlogPost[]) => {
    setBlogs(newBlogs);
    localStorage.setItem('harsh-blogs', JSON.stringify(newBlogs));
  };

  const addBlog = (blog: Omit<BlogPost, 'id' | 'date'>) => {
    const newBlog: BlogPost = {
      ...blog,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    saveBlogs([newBlog, ...blogs]);
  };

  const updateBlog = (id: string, updatedFields: Partial<BlogPost>) => {
    const updated = blogs.map(b => b.id === id ? { ...b, ...updatedFields } : b);
    saveBlogs(updated);
  };

  const deleteBlog = (id: string) => {
    saveBlogs(blogs.filter(b => b.id !== id));
  };

  return { blogs, addBlog, updateBlog, deleteBlog };
};
