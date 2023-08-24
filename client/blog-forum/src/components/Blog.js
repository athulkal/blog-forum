import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../reducers/blogReducer";
import { getLoggedInUser } from "../reducers/userReducer";
import Categories from "./Categories";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  console.log(blogs);

  const dateOptions = { month: "long", day: "numeric" };

  return (
    <div className="mx-4 md:mx-64 mt-8 md:border-r-2 p-4">
      {blogs.map((blog) => (
        <div
          className="h-auto md:h-48 border-b-2 border-gray-200 mb-2 cursor-pointer p-2"
          key={blog.id}
        >
          <div className="text-xl md:text-2xl font-semibold leading-2 mb-1">
            {blog.title}
          </div>
          <div className="flex flex-col md:flex-row text-sm text-gray-600 mb-2">
            <div className="mr-2 md:mb-0">by {blog.user.name},</div>
            <div>
              {new Date(blog.date).toLocaleString("en-US", dateOptions)}
            </div>
          </div>
          <div className="text-sm text-gray-800 mb-2">
            {blog.description.substring(0, 100)}...
          </div>
          <div className="flex flex-wrap">
            {blog.Tags.map((tag) => (
              <div
                key={tag.id}
                className="border-solid text-center h-6 leading-4 px-2 md:px-3 py-1 mr-2 mb-2 border-gray-700 rounded-full cursor-pointer bg-gray-200 text-gray-800 text-xs md:text-sm whitespace-no-wrap"
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
