 
import { IFontStyle } from '@/assets/fonts/fonts';
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';



const initialState: IFontStyle = { family: { norm: 'undefined', bold: '' }, size: 0.9 };

const fontSlice = createSlice({
  name: 'fontReducer',
  initialState,

  reducers: {
    SET_FONT_FAMILY: (state, action: PayloadAction<IFontStyle>) => {
      state.family = action.payload?.family;
    },
    SET_FONT_SIZE: (state, action: PayloadAction<IFontStyle>) => {
      state.size = action.payload?.size;
    },
  },
});

export const { SET_FONT_FAMILY, SET_FONT_SIZE } = fontSlice.actions;
const fontReducer = fontSlice.reducer;
export default fontReducer;
