import { createSlice } from "@reduxjs/toolkit";
import { Event, Club } from "../../components/Types/types";

interface feedState {
  Events: Event[] | null;
  Clubs: Club[] | null;
}

const initialState: feedState = {
  Events: null,
  Clubs: null,
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
  },
});

export const { setClubs, setEvents } = feedSlice.actions;

export default feedSlice.reducer;
