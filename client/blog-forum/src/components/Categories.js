import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs, getBlogsForTags } from "../reducers/blogReducer";

const Categories = () => {
  const [toggleTags, setToggleTags] = useState([]);
  const tags = useSelector((state) => state.user.loggedInUser.Tags);
  const selectedBlogs = useSelector((state) => state.blogs.selectedBlogs);
  const [selection, setSelection] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setToggleTags(tags.map((tag) => ({ ...tag, selected: false })));
  }, []);

  console.log(toggleTags);

  const handleTagChange = (tagId) => {
    dispatch(getBlogsForTags(tagId));
    setToggleTags(
      toggleTags.map((tag) =>
        tag.id === tagId
          ? { ...tag, selected: !tag.selected }
          : { ...tag, selected: false }
      )
    );
    setSelection(false);
  };

  const handleSelection = () => {
    setSelection(true);
    setToggleTags(toggleTags.map((tag) => ({ ...tag, selected: false })));
    dispatch(getBlogs());
  };

  console.log(selectedBlogs);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start h-auto border-b-2 border-gray-200 p-2">
      <div
        className={`mr-0 sm:mr-4 mb-2 sm:mb-0 p-2 cursor-pointer ${
          selection ? " bg-black text-white" : "border-gray-300 text-black"
        } border rounded-lg`}
        onClick={handleSelection}
      >
        Following
      </div>
      <div className="flex flex-wrap">
        {toggleTags.map((tag) => (
          <div
            className={`mr-2 mb-2 p-2 border ${
              tag.selected
                ? " bg-black text-white"
                : "border-gray-300 text-black  hover:bg-gray-100"
            } border-gray-300 rounded-lg cursor-pointer`}
            key={tag.id}
            onClick={() => handleTagChange(tag.id)}
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
/*
for the moment the toggling works but we need to see why 
not do the changes in the tag state in the reducer itself 
*/
