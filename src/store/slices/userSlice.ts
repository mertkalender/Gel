import {createAction, createSlice, PrepareAction} from '@reduxjs/toolkit';
import {User} from '../../types/user';

export interface UserState {
  user: User[];
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: [],
  isLoggedIn: false,
};

export const setIsLoggedIn = createAction<PrepareAction<boolean>>(
  'user/setIsLoggedIn',
  isLoggedIn => ({
    payload: isLoggedIn,
  }),
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setIsLoggedIn, (state, action) => {
      state.isLoggedIn = action.payload;
    });
  },
});

export default userSlice.reducer;
