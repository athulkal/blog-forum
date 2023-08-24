import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotification } from "./notificationReducer";
import axios from "axios";

const baseUrl = "http://localhost:3001";

const initialState = {
  user: null,
  status: "idle",
  error: null,
  loggedInUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loggedInUser = action.payload;
    });
  },
});

export const getUser = createAsyncThunk(
  "user/getUser",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, credentials, {
        withCredentials: true,
      });
      dispatch(updateNotification("Logged in successfully", "success", 10));
      console.log(response.data);
      return response.data;
    } catch (err) {
      dispatch(updateNotification(err.response.data.error, "error", 10));
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const getLoggedInUser = createAsyncThunk(
  "user/loggedInUser",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/loggedInUser`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export default userSlice.reducer;
