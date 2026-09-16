import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import fontSlice from './slice/fontSlice';
 import userSlice from './slice/userSlice';
 import TokenResponseDtoSlice from './slice/TokenResponseDtoSlice';
import numPerPageSlice from './slice/numPerPageSlice';
import loginSlice from './slice/loginSlice';

const rootReducer = combineReducers({
  userSlice,
   fontSlice,
   numPerPageSlice,
  loginSlice,
  TokenResponseDtoSlice
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'userSlice',
     'fontSlice',
     'numPerPageSlice',
    'loginSlice',
    'TokenResponseDtoSlice'
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',

  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
