import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  dialogs: {},
  selectedMessages: [],
  forwardManyMessage: {},
};

export const messageSlice = createSlice({
  name: "message",
  initialState,

  reducers: {
    setDialog(state, action) {
      if (!(action.payload.id in state.dialogs)) {
        state.dialogs[action.payload.id] = {
          text: "",
          answer: {},
          forward: [],
          file: [],
        };
      }
    },
    clearDialog(state, action) {
      state.dialogs[action.payload.id] = {
        text: "",
        answer: {},
        forward: [],
        file: [],
      };
    },
    onChangeTextDialog(state, action) {
      state.dialogs[action.payload.id].text = action.payload.text;
    },
    onChangeAnswerDialog(state, action) {
      state.dialogs[action.payload.id].answer = action.payload.answer;
    },
    onChangeFileDialog(state, action) {
      state.dialogs[action.payload.id].file = [
        ...state.dialogs[action.payload.id].file,
        ...action.payload.file,
      ];
    },
    selectMessages(state, action) {
      const { obj } = action.payload;
      const indexMessage = state.selectedMessages.findIndex((message) => message.id === obj.id);

      if (indexMessage === -1) {
        state.selectedMessages.push(obj);
      } else {
        state.selectedMessages.splice(indexMessage, 1);
      }
      state.selectedMessages.sort((a, b) => a.id - b.id);
    },
    clearSelectMessages(state) {
      state.selectedMessages = [];
    },
    clearForwardMessage(state, action) {
      state.dialogs[action.payload.param].forward = [];
    },
    clearAnswerMessage(state, action) {
      state.dialogs[action.payload.param].answer = [];
    },
    setForwardMessageIfMany(state, action) {
      state.forwardManyMessage = action.payload;
    },
  },
});

export const {
  setDialog,
  clearDialog,
  onChangeTextDialog,
  selectMessages,
  clearSelectMessages,
  onChangeAnswerDialog,
  onChangeFileDialog,
  clearForwardMessage,
  clearAnswerMessage,
  setForwardMessageIfMany,
} = messageSlice.actions;

export default messageSlice.reducer;

const messageSelectors = {
  textMessage: (state, id) => state.message.dialogs[id]?.text ?? "",
  forwardMessage: (state, id) => state.message.dialogs[id]?.forward ?? [],
  answerMessage: (state, id) => state.message.dialogs[id]?.answer ?? {},
  fileMessage: (state, id) => state.message.dialogs[id]?.file ?? [],
  selectedMessages: (state) => state.message.selectedMessages ?? [],
};

export const { textMessage, forwardMessage, answerMessage, fileMessage, selectedMessages } =
  messageSelectors;
