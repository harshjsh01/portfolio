import { useState } from 'react';
import { useBlogs, BlogPost } from '../hooks/useBlogs';

const AdminBlog = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlogs();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', imageUrl: '' });

  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setFormData({ title: blog.title, excerpt: blog.excerpt, content: blog.content, imageUrl: blog.imageUrl || '' });
  };

  const handleSave = () => {
    if (editingId) {
      updateBlog(editingId, formData);
    } else {
      addBlog(formData);
    }
    setEditingId(null);
    setFormData({ title: '', excerpt: '', content: '', imageUrl: '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', excerpt: '', content: '', imageUrl: '' });
  };

  return (
    <div style={{ padding: '5rem 2rem', color: 'white', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Blog Admin Portal</h1>
      <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Hidden URL for managing posts</p>

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '8px', marginBottom: '3rem' }}>
        <h2>{editingId ? 'Edit Post' : 'Create New Post'}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <input 
            type="text" placeholder="Title" value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            style={{ padding: '0.8rem', background: 'transparent', border: '1px solid gray', color: 'white' }} 
          />
          <input 
            type="text" placeholder="Image URL (optional)" value={formData.imageUrl} 
            onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
            style={{ padding: '0.8rem', background: 'transparent', border: '1px solid gray', color: 'white' }} 
          />
          <textarea 
            placeholder="Excerpt (short summary)" value={formData.excerpt} 
            onChange={e => setFormData({...formData, excerpt: e.target.value})} 
            style={{ padding: '0.8rem', background: 'transparent', border: '1px solid gray', color: 'white', minHeight: '80px' }} 
          />
          <textarea 
            placeholder="Full Content" value={formData.content} 
            onChange={e => setFormData({...formData, content: e.target.value})} 
            style={{ padding: '0.8rem', background: 'transparent', border: '1px solid gray', color: 'white', minHeight: '200px' }} 
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.8rem 2rem', background: 'white', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Save Post</button>
            {editingId && <button onClick={cancelEdit} style={{ padding: '0.8rem 2rem', background: 'transparent', color: 'white', border: '1px solid white', cursor: 'pointer' }}>Cancel</button>}
          </div>
        </div>
      </div>

      <h2>Existing Posts</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {blogs.map(blog => (
          <div key={blog.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{blog.title}</h3>
              <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{new Date(blog.date).toLocaleDateString()}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => handleEdit(blog)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid white', color: 'white', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => deleteBlog(blog.id)} style={{ padding: '0.5rem 1rem', background: 'red', border: 'none', color: 'white', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;
