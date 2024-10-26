import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../components/Types/types";

interface PostsState {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

const initialState: PostsState = {
  posts: [],
  currentPage: 1,
  totalPages: 1,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload.posts;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    appendPosts(state, action) {
      state.posts = [...state.posts, ...action.payload.posts];
      state.currentPage += 1;
    },
    resetPosts(state) {
      state.posts = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
});

export const { setPosts, appendPosts, resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
