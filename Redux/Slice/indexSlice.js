import {createSlice} from '@reduxjs/toolkit';
const initialState={
    index:0
}
export const indexSlice = createSlice({
    name:'index',
    initialState,
    reducers:{
        indexTab:(state,action)=>{
            state.index = action.payload
        }
    }
})
export const {indexTab} = indexSlice.actions;
export default indexSlice.reducer;