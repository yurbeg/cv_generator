import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import userInfoReducer from '../slice/userInfoSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
