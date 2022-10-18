
import { FAV_ARTICLE, REG_ID, SUB_STATUS } from "./Action"
import { SCREEN_NAME } from "./Action"


const initialState={
    regId:0,
 
}
const initialScreenState={
    screen:'Main'
}
const initialFavState={
    stat:0
}
const initialSubState={
    subId:0
}
export const FavReducer=(state=initialFavState,action)=>{
    switch(action.type){
        case FAV_ARTICLE:{
            return{
                ...state,
                stat:action.payload
            }
           
        }
        default: return state
}
}
export const screenReducer=(state=initialScreenState,action)=>{
    switch(action.type){
        case SCREEN_NAME:{
            return{
                ...state,
                screen:action.payload
            }
           
        }
        default: return state
}
}
 
 export  const reducer = (state=initialState,action)=>{
    switch(action.type){
        case REG_ID:{
            return{
                ...state,
                regId:action.payload
            }
           
        }
        default: return state
    }
 }
 export  const subReducer = (state=initialSubState,action)=>{
    switch(action.type){
        case SUB_STATUS:{
            return{
                ...state,
                subId:action.payload
            }
           
        }
        default: return state
    }
 }
