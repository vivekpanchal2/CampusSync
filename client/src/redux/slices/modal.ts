import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  termsModal: boolean;
}

const initialState: modalState = {
  termsModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsTermsModal(state, action) {
      state.termsModal = action.payload;
    },
  },
});

export const { setIsTermsModal } = modalSlice.actions;

export default modalSlice.reducer;
