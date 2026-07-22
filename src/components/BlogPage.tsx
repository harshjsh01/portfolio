import { Link } from 'react-router-dom';
import { useBlogs, BlogPost } from '../hooks/useBlogs';
import { useState, useEffect } from 'react';

const BlogPage = () => {
  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, []);
  const { blogs } = useBlogs();
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  if (selectedBlog) {
    return (
      <div style={{ padding: '5rem 2rem', color: 'white', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <button onClick={() => setSelectedBlog(null)} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '0.5rem 1rem', cursor: 'pointer', marginBottom: '2rem' }}>&larr; Back to Blogs</button>
        {selectedBlog.imageUrl && <img src={selectedBlog.imageUrl} alt={selectedBlog.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} />}
        <h1 style={{ fontSize: '3rem', margin: '2rem 0 1rem 0' }}>{selectedBlog.title}</h1>
        <p style={{ opacity: 0.7, marginBottom: '2rem' }}>{new Date(selectedBlog.date).toLocaleDateString()}</p>
        <div style={{ lineHeight: '1.8', fontSize: '1.2rem', whiteSpace: 'pre-wrap' }}>
          {selectedBlog.content}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '5rem 2rem', color: 'white', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem' }}>My Blog</h1>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', borderBottom: '1px solid white' }}>Back to Portfolio</Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {blogs.map(blog => (
          <div key={blog.id} onClick={() => setSelectedBlog(blog)} style={{ cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'none'}>
            {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
            <div style={{ padding: '1.5rem' }}>
              <p style={{ opacity: 0.5, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{new Date(blog.date).toLocaleDateString()}</p>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{blog.title}</h2>
              <p style={{ opacity: 0.8 }}>{blog.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
