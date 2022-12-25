import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { commentsReducer } from "./slices/comments";

const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    comments: commentsReducer,
  },
});

export default store;
