import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    height:60,
}

export const heightSlice = createSlice({
    name:'height',
    initialState,
    reducers:{
       height:(state,action)=>{
                state.height=action.payload
        }

    }


})
export const {height} = heightSlice.actions;
export default heightSlice.reducer;