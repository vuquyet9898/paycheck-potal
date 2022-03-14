import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
const rootReducer = combineReducers({
  authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
