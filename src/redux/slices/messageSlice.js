import {createSlice} from "@reduxjs/toolkit";
import {addTimeMessage} from "../../components/actions/addTimeMessage";
import {HOST} from "../../components/api/HOST";
import _ from "underscore";


const initialState = {
    message: {},
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
        }
    },


})

export const {setMessage, addMessage, newMessages} = messageSlice.actions

export default messageSlice.reducer