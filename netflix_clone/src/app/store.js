import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
// import userReducer from '../features/userSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});




