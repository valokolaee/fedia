import {
  // createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import IUser from '../interfaces/IUser';


const initialState: IUser = {
  mobile: '',
  pin: ''
  
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,

  reducers: {
    SET_USER: (state, action: PayloadAction<IUser>) => {
      state.mobile = action.payload?.mobile;
      state.pin = action.payload?.pin;

    },
  },
});

export const { SET_USER } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
