import { TokenResponseDto } from '@/webService/periodcycleApis';
import {
  // createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';


const initialState: TokenResponseDto = {
  accessToken: '',
  accessTokenExpireAt: ''

};

const TokenResponseDtoSlice = createSlice({
  name: 'TokenResponseDtoReducer',
  initialState,

  reducers: {
    SET_TokenResponseDto: (state, action: PayloadAction<TokenResponseDto>) => {
      state.accessToken = action.payload?.accessToken;
      state.accessTokenExpireAt = action.payload?.accessTokenExpireAt;
    },
  },
});

export const { SET_TokenResponseDto } = TokenResponseDtoSlice.actions;
const TokenResponseDtoReducer = TokenResponseDtoSlice.reducer;
export default TokenResponseDtoReducer;
