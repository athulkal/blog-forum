import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tags: [],
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    toggleSelection(state, action) {
      state.tags = state.tags.map((topic) =>
        topic.id === action.payload
          ? { ...topic, selected: !topic.selected }
          : topic
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTopics.fulfilled, (state, action) => {
      state.tags = action.payload.map((topic) => ({
        ...topic,
        selected: false,
      }));
    });
  },
});

export const { toggleSelection } = topicSlice.actions;

export const getTopics = createAsyncThunk("topics/getTopics", async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/tags");
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export default topicSlice.reducer;
