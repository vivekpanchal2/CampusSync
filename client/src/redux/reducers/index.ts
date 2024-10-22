import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/auth.ts";
import modalReducer from "../slices/modal.ts";
import feedReducer from "../slices/feed.ts";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  feed: feedReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
