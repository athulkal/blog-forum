import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    type: "",
    message: null,
  },
  reducers: {
    setNotification(state, action) {
      return (state = { ...state, ...action.payload });
    },
  },
});

export const { setNotification } = notificationSlice.actions;

// using redux thunks

export const updateNotification = (message, type, time) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }));
    setTimeout(async () => {
      dispatch(setNotification({ message: null, type: "" }));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
