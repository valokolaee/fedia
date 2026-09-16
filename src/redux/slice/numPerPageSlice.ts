
import {

  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';


const initialState = { numPerPage: 10 };

const numPerPageSlice = createSlice({
  name: 'numPerPageSlice',
  initialState,

  reducers: {
    SET_IS_NUM_PER_PAGE: (state, action: PayloadAction<number>) => {
      state.numPerPage = action.payload;
    },

  },
});

export const { SET_IS_NUM_PER_PAGE, } = numPerPageSlice.actions;
const numPerPageReducer = numPerPageSlice.reducer;
export default numPerPageReducer;
