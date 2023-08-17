import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    type: "",
    message: null,
  },
  reducers: {
    setNotification(state, action) {
      console.log(state);
      return (state = action.payload);
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const updateNotification = (message, type, time) => {
  return async (dispatch) => {
    console.log(message);
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(setNotification({ message: null, type: "" }));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
