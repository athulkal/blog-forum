import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
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
      state.user = action.payload;
      state.status = "success";
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getUser = createAsyncThunk(
  "user/getUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        credentials,
        { withCredentials: true }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export default userSlice.reducer;
