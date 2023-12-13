import {configureStore, combineReducers} from '@reduxjs/toolkit';
import indexSlice from './Slice/indexSlice';
import screenSlice from './Slice/screenNameSlice';
import DoctorDataSlice from './Slice/DoctorDetailSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import heightSlice from './Slice/heightSlice';
const rootReducer = combineReducers({
  screen: screenSlice,
  height: heightSlice,
  index: indexSlice,
  docData: DoctorDataSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['screen', 'index', 'height'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
