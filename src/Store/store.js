import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loggerMiddleware from './logger';
import thunkMiddleware from 'redux-thunk';

import monitorReducerEnhancer from './monitorReducersEnhancer';
import rootReducer from './reducer/rootReducer';
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [loggerMiddleware, thunkMiddleware],
  enhancers: [monitorReducerEnhancer],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
