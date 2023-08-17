import React, { useState } from "react";
import axios from "axios";
const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);

  const handlePostTitle = (e) => {
    setTitle(e.target.value);
  };
  const handlePostDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlePostCategory = (e) => {
    const newCategory = category.concat(e.target.value);
    setCategory(newCategory);
  };
  const handlePostCreation = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/blogs",
        {
          title,
          description,
          category,
        },
        { withCredentials: true }
      )
      .then((result) => console.log(result.data));
  };

  return (
    <div>
      <form onSubmit={handlePostCreation}>
        <label>title</label>
        <input type="text" onChange={handlePostTitle} />
        <label>description</label>
        <textarea rows="5" cols="33" onChange={handlePostDescription} />
        <label>category</label>
        <input type="text" onChange={handlePostCategory} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default BlogForm;
