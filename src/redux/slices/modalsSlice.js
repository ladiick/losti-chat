import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenForwardModal: false,
  isOpenDetailedForwardModal: false,
  isOpenAttachmentsModal: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,

  reducers: {
    setForwardModal(state, action) {
      state.isOpenForwardModal = action.payload;
    },
    setDetailedForwardModal(state, action) {
      state.isOpenDetailedForwardModal = action.payload;
    },
    setAttachmentsModal(state, action) {
      state.isOpenAttachmentsModal = action.payload;
    },
  },
});

export const { setForwardModal, setDetailedForwardModal, setAttachmentsModal } =
  modalsSlice.actions;

export default modalsSlice.reducer;

export const modalsSelectors = (state) => state.modals;
