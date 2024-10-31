import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem(`blog-${id}-likes`);
    return savedLikes ? parseInt(savedLikes, 10) : 0;
  });

  useEffect(() => {
    fetch(`http://localhost:3001/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);

  if (!blog) return <p>加载中...</p>;

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`blog-${id}-likes`, newLikes);
  };

  return (
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>
      <div>{formatContent(blog.content)}</div>
      <div className="like-section">
        <button onClick={handleLike} className="like-button">
          <img src="/like.png" alt="Like" className="like-icon" />
        </button>
        <p>已点赞: {likes}</p>
      </div>
      <Comments blogId={id} />
    </div>
  );
}

export default BlogDetail;