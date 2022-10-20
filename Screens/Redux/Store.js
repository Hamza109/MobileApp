
import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import  { dataReducer, FavReducer, reducer } from './Reducer'
import thunk from 'redux-thunk'
import { screenReducer } from './Reducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer,persistStore } from 'redux-persist'
const rootReducer=combineReducers({
    userId:reducer,
    name:screenReducer,
    favourite:FavReducer,
    info:dataReducer
})
const persistConfig ={
    key: 'root',
    storage:AsyncStorage
}
const persistedReducer= persistReducer(persistConfig,rootReducer)
export default ()=>{
    const Store=createStore(persistedReducer,applyMiddleware(thunk))
  const persistor=persistStore(Store)

 return {Store,persistor}
}
