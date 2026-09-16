
import { createSlice, } from '@reduxjs/toolkit';
import ILogin from '../interfaces/ILogin';


const initialState: ILogin = { show: false };

const loginSlice = createSlice({
  name: 'loginReducer',
  initialState,

  reducers: {
    SET_LOGIN_SHOW: (state,) => { state.show = true },
    SET_LOGIN_HIDE: (state,) => { state.show = false },
  },
});

export const { SET_LOGIN_SHOW, SET_LOGIN_HIDE } = loginSlice.actions;
const loginReducer = loginSlice.reducer;
export default loginReducer;
