import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  selectedBlogs: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      console.log(action.payload);
      state.blogs = action.payload;
    });
    builder.addCase(getBlogsForTags.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
  },
});

export const getBlogs = createAsyncThunk("blogs/getBlogs", async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/blogs", {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getBlogsForTags = createAsyncThunk(
  "blogs/getBlogsForTags",
  async (tagId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/blogs/${tagId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default blogSlice.reducer;
