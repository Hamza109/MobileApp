
import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import  { dataReducer, FavReducer, profileReducer, reducer, rowReducer, typeReducer } from './Reducer'
import thunk from 'redux-thunk'
import { screenReducer } from './Reducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer,persistStore } from 'redux-persist'
const rootReducer=combineReducers({
    userId:reducer,
    name:screenReducer,
    favourite:FavReducer,
    info:dataReducer,
    profileInfo:profileReducer,
    userType:typeReducer,
    docRow:rowReducer
})
const persistConfig ={
    key: 'root',
    storage:AsyncStorage,
    blacklist: ['name'],
}
const persistedReducer= persistReducer(persistConfig,rootReducer)
export default ()=>{
    const Store=createStore(persistedReducer,applyMiddleware(thunk))
  const persistor=persistStore(Store)

 return {Store,persistor}
}
