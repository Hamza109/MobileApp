import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    option:0
}
export const optionSlice = createSlice({
    name:'option',
    initialState,
    reducers:{
        option:(state,action) =>{
            state.option = action.payload
        }
    }
})

export const {option} = optionSlice.actions

export default optionSlice.reducer;