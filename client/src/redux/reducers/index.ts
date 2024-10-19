import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/auth.ts";
import modalReducer from "../slices/modal.ts";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
