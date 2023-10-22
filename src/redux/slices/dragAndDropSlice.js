import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeDropZone: "image" || "document",
  dragOver: false,
  visibleDropZone: false,
};

export const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState,
  reducers: {
    setTypeDropZone: (state, action) => {
      state.typeDropZone = action.payload;
    },
    setDragOver(state, action) {
      state.dragOver = action.payload;
    },
    setVisibleDropZone(state, action) {
      state.visibleDropZone = action.payload;
    },
  },
});

export const { setTypeDropZone, setDragOver, setVisibleDropZone } = dragAndDropSlice.actions;

export default dragAndDropSlice.reducer;
