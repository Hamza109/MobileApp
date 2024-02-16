import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import {
  chatInfoReducer,
  dataReducer,
  FavReducer,
  mailReducer,
  passReducer,
  profileReducer,
  recentCuresReducer,
  reducer,
  rowReducer,
  topDocReducer,
  typeReducer,
  getArticleIdReducer,
} from './Reducer';
import thunk from 'redux-thunk';
import {screenReducer} from './Reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
const rootReducer = combineReducers({
  userId: reducer,
  name: screenReducer,
  favourite: FavReducer,
  info: dataReducer,
  profileInfo: profileReducer,
  userType: typeReducer,
  docRow: rowReducer,
  mail: mailReducer,
  pass: passReducer,
  top: topDocReducer,
  recent: recentCuresReducer,
  chatUser: chatInfoReducer,
  getArtId: getArticleIdReducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['name', 'getArtId'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default () => {
  const Store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(Store);

  return {Store, persistor};
};
