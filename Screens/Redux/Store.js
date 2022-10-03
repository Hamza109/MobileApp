
import {legacy_createStore as createStore,combineReducers} from 'redux'
import  { FavReducer, reducer } from './Reducer'
import { screenReducer } from './Reducer'
const rootReducer=combineReducers({
    userId:reducer,
    name:screenReducer,
    favourite:FavReducer
})
export const Store=createStore(rootReducer)
