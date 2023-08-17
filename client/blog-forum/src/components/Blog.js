import React, { useEffect, useState } from "react";
import CommentList from "./Comment";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const result = axios
      .get("http://localhost:3001/api/blogs")
      .then((result) => {
        const newBlogs = blogs.concat(result.data);
        setBlogs(newBlogs);
      });
  }, []);

  console.log(blogs);
  return (
    <div>
      {blogs.map((blog) => (
        <div>
          <div>{blog.title}</div>
          <CommentList comments={blog.Comments} />
        </div>
      ))}
    </div>
  );
};
export default Blog;
