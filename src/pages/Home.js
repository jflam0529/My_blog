import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const images = [
    "/coding.jpg", // 替换为实际的图片路径
    "/node4js.jpg",
    "/SPA.png"
  ];

  useEffect(() => {
    fetch('http://localhost:3001/api/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="home-container">
      <h1>欢迎来到我的博客</h1>
      {blogs.map((blog, index) => (
        <div key={blog.id} className="blog-post">
          <div className="blog-content">
            <h2>{blog.title}</h2>
            <p>{blog.summary}</p>
            <Link to={`/blogs/${blog.id}`}>阅读更多</Link>
          </div>
          <img src={images[index]} alt={`Blog ${blog.id}`} className="blog-image" />
        </div>
      ))}
    </div>
  );
}

export default Home;