const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const fs = require('fs'); 

app.use(cors());
app.use(express.json()); // Parse JSON request body

// Get all blogs
app.get('/api/blogs', (req, res) => {
  fs.readFile('./blog.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send("Failed to read data");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Get a single blog
app.get('/api/blogs/:id', (req, res) => {
  fs.readFile('./blog.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send("Failed to read data");
    } else {
      const blogs = JSON.parse(data);
      const blog = blogs.find((b) => b.id === parseInt(req.params.id));
      if (blog) res.json(blog);
      else res.status(404).send("Blog not found");
    }
  });
});

// Get comments for a blog
app.get('/api/blogs/:id/comments', (req, res) => {
  fs.readFile('../src/pages/comments.json', 'utf-8', (err, data) => {
    if (err) {
      console.error("Error reading comments.json:", err);
      res.status(500).json({ error: "Failed to read comments" });
    } else {
      try {
        const comments = JSON.parse(data);
        const blogComments = comments.filter(comment => comment.blogId === parseInt(req.params.id));
        res.json(blogComments);
      } catch (parseError) {
        console.error("Error parsing comments.json:", parseError);
        res.status(500).json({ error: "Failed to parse comments" });
      }
    }
  });
});

// Add a comment
app.post('/api/blogs/:id/comments', (req, res) => {
  const newComment = {
    blogId: parseInt(req.params.id),
    text: req.body.text,
    date: new Date().toISOString()
  };

  fs.readFile('../src/pages/comments.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send("Failed to read comments");
    } else {
      const comments = JSON.parse(data);
      comments.push(newComment);
      fs.writeFile('../src/pages/comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send("Failed to save comment");
        } else {
          res.status(201).json(newComment);
        }
      });
    }
  });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));