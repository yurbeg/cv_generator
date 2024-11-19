// src/state-managment/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === "true",
  uid: localStorage.getItem('uid') || undefined, // Считываем uid из localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.uid = undefined; // Очистить uid при выходе
      localStorage.setItem('isAuthenticated', 'false');
      localStorage.removeItem('uid');
    },
    setUid: (state, action) => {
      state.uid = action.payload;
      localStorage.setItem('uid', action.payload); // Сохраняем uid в localStorage
    },
  },
});

export const { login, logout, setUid } = authSlice.actions;
export default authSlice.reducer;
