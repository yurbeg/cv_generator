import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  education: {},
  skills: [],
  miniProject: {},
  social: {},
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setMiniProject: (state, action) => {
      state.miniProject = action.payload;
    },
    setSocial: (state, action) => {
      state.social = action.payload;
    },
  },
});

export const { setProfile, setEducation, setSkills, setMiniProject, setSocial } = userInfoSlice.actions;
export default userInfoSlice.reducer;
