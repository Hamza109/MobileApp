
import {legacy_createStore as createStore,combineReducers} from 'redux'
import  { FavReducer, reducer } from './Reducer'
import { screenReducer } from './Reducer'
import { subReducer } from './Reducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer,persistStore } from 'redux-persist'
const rootReducer=combineReducers({
    userId:reducer,
    name:screenReducer,
    favourite:FavReducer,
    subStat:subReducer,
})
const persistConfig ={
    key: 'root',
    storage:AsyncStorage
}
const persistedReducer= persistReducer(persistConfig,rootReducer)
export default ()=>{
    const Store=createStore(persistedReducer)
  const persistor=persistStore(Store)

 return {Store,persistor}
}
