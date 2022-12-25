import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComment = createAsyncThunk(
  "auth/fetchComment",
  async (params) => {
    const { data } = await axios.post(
      `/posts/${params.postId}/comments`,
      params
    );
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchComment.pending]: (state, action) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchComment.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchComment.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
