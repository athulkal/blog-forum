import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import notificationReducer from "../reducers/notificationReducer";
import topicReducer from "../reducers/topicReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    topics: topicReducer,
  },
});

export default store;
