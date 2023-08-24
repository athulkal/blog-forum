import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import notificationReducer from "../reducers/notificationReducer";
import topicReducer from "../reducers/topicReducer";
import blogReducer from "../reducers/blogReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    topics: topicReducer,
    blogs: blogReducer,
  },
});

export default store;
