import { createSlice } from "@reduxjs/toolkit";
import _ from "underscore";
const initialState = {
  message: {},
  currentMessage: {},
  sendMessageOnChat: {},
  forwardManyMessage: {},
};

export const messageSlice = createSlice({
  name: "message",
  initialState,

  reducers: {
    addMessage(state, action) {
      if (_.isEmpty(state.message)) {
        state.message = { ...action.payload };
      }

      state.message.next = action.payload.next;

      const indexOldMessage = action.payload.results.findIndex((obj) => {
        return state.message.results[state.message.results.length - 1].id === obj.id;
      });

      if (indexOldMessage !== -1) {
        state.message.results = [...state.message.results, ...action.payload.results.slice(indexOldMessage + 1)];
      } else {
        // Иначе просто добавляем все результаты из action.payload.results
        state.message.results = [...state.message.results, ...action.payload.results];
      }
    },

    setMessage: (state, action) => {
      state?.message?.results?.unshift(action?.payload);
    },
    currentMessage(state, action) {
      const { param, obj } = action.payload;

      if (!(param in state.currentMessage)) {
        state.currentMessage = {
          ...state.currentMessage,
          [param]: [],
        };
      }

      const indexMessage = state.currentMessage[param].findIndex((message) => message.id === obj.id);

      if (indexMessage === -1) {
        state.currentMessage[param].push(obj);
        state.currentMessage[param].sort((a, b) => a.id - b.id);
      } else {
        state.currentMessage[param].splice(indexMessage, 1);
      }
    },

    clearMessage(state, action) {
      state.currentMessage[action.payload.param] = [];
    },

    sendMessagesOnChat(state, action) {
      if (!(action.payload.param in state.sendMessageOnChat)) {
        state.sendMessageOnChat[action.payload.param] = {
          sendMessage: "",
          forwardMessage: [],
          answerMessage: {},
          file: [],
        };
      }

      if (action.payload.message) {
        state.sendMessageOnChat[action.payload.param].sendMessage = action.payload.message;
      } else {
        state.sendMessageOnChat[action.payload.param].sendMessage = "";
      }

      if (action.payload.forwardMessage) {
        state.sendMessageOnChat[action.payload.param].forwardMessage = action.payload.forwardMessage;
      }

      if (action.payload.answerMessage) {
        state.sendMessageOnChat[action.payload.param].answerMessage = action.payload.answerMessage;
      }

      if (action.payload.file) {
        state.sendMessageOnChat[action.payload.param].file = [...state.sendMessageOnChat[action.payload.param].file, ...action.payload.file];
      }
    },
    clearForwardMessage(state, action) {
      state.sendMessageOnChat[action.payload.param].forwardMessage = [];
    },
    clearAnswerMessage(state, action) {
      state.sendMessageOnChat[action.payload.param].answerMessage = {};
    },

    setForwardMessageIfMany(state, action) {
      state.forwardManyMessage = action.payload;
    },
  },
});

export const {
  setMessage,
  addMessage,
  currentMessage,
  clearMessage,
  sendMessagesOnChat,
  clearForwardMessage,
  clearAnswerMessage,
  setForwardMessageIfMany,
} = messageSlice.actions;

export default messageSlice.reducer;
