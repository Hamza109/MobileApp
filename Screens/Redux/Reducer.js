import { State } from "react-native-gesture-handler"
import { FAV_ARTICLE, REG_ID ,FETCH_FAILURE,FETCH_REQUEST,FETCH_SUCCESS,FETCH_ARTICLE} from "./Action"
import { SCREEN_NAME } from "./Action"

const initialFetchState={
    loading:false,
    data:[],
    error:''
}

const initialState={
    regId:0,
 
}
const initialScreenState={
    screen:'Main'
}
const initialFavState={
    stat:0
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

 export const dataReducer=(state=initialFetchState,action)=>{
    switch(action.type){
        case FETCH_REQUEST:{
            return{
                ...state,
                loading:true
            }
        }
        case FETCH_SUCCESS:{
            return {
             
              loading:false,
              data:action.payload,
              error:''
            }
        }
       
        case FETCH_FAILURE:{
            return {
              loading:false,
              data:[],
              error:action.payload
            }
        }
        default:return state
    }
    
 }
