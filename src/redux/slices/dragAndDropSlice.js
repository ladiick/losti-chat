import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeDropZone: 'image' || 'document'
};

export const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState,
  reducers: {
    setTypeDropZone: (state, action) => {
      state.typeDropZone = action.payload;
    },
  },
});

export const { setTypeDropZone } = dragAndDropSlice.actions;

export default dragAndDropSlice.reducer;