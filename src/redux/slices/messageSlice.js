import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    message: {},
    currentMessage: [],
}


export const messageSlice = createSlice({
    name: 'message',
    initialState,

    reducers: {
        addMessage(state, action) {

            state.message.next = action.payload.next

            let indexOldMessage = action.payload.results.findIndex(obj => {
                if (state.message.results[state.message.results.length - 1].id === obj.id) {
                    return true
                } else {
                    return false
                }

            })


            if (indexOldMessage !== -1) {
                state.message.results = [...state.message.results, ...action.payload.results.slice(indexOldMessage + 1, action.payload.length)]
            } else {
                state.message.results = [...state.message.results, ...action.payload.results]
            }
        },

        newMessages(state, action) {
            state.message = action.payload
        },

        setMessage: (state, action) => {
            state.message.results.unshift(action.payload)
        },
        currentMessage(state, action) {

            const indexMessage = state.currentMessage.findIndex((message, index) => {
                if (message.id === action.payload.id) {
                    return true
                }
            })

            if (indexMessage === -1) {
                state.currentMessage.push(action.payload)
            } else {
                state.currentMessage.splice(indexMessage, 1)
            }

        },
        clearMessage(state){
            state.currentMessage = []
        }

    },


})

export const {setMessage, addMessage, newMessages, currentMessage, clearMessage} = messageSlice.actions

export default messageSlice.reducer