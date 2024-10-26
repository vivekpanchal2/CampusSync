import { createSlice } from "@reduxjs/toolkit";
import { Event, Club, Post } from "../../components/Types/types";

interface feedState {
  Events: Event[] | null;
  Clubs: Club[] | null;
  Posts: Post[];
}

const initialState: feedState = {
  Events: null,
  Clubs: null,
  Posts: [],
};

const feedSlice = createSlice({
  name: "Feed",
  initialState,
  reducers: {
    setEvents(state, action) {
      state.Events = action.payload;
    },
    setClubs(state, action) {
      state.Clubs = action.payload;
    },
    setPosts(state, action) {
      state.Posts = action.payload;
    },
    appendPosts(state, action) {
      state.Posts = [...state.Posts, ...action.payload];
    },
  },
});

export const { setClubs, setEvents, setPosts, appendPosts } = feedSlice.actions;

export default feedSlice.reducer;
