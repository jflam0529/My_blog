import { useState, useEffect } from 'react';

function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/api/blogs/${blogId}/comments`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [blogId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment) return;

    fetch(`http://localhost:3001/api/blogs/${blogId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newComment })
    })
      .then(res => res.json())
      .then(comment => {
        setComments([...comments, comment]);
        setNewComment('');
      });
  };

  return (
    <div className="comments-section">
      <h3>评论</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text} - {new Date(comment.date).toLocaleString()}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="写下你的评论..."
          required
        />
        <button type="submit">提交评论</button>
      </form>
    </div>
  );
}

export default Comments;
