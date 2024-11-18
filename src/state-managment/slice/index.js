import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isAuthenticated:  localStorage.getItem('isAuthenticated') === "true",
  uid: undefined
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
      localStorage.setItem('isAuthenticated', 'false');
    },
    setUid:(state,action)=>{
      state.uid = action.payload
    }
  },
});

export const { login, logout,setUid } = authSlice.actions;
export default authSlice.reducer;
