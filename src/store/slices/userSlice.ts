import {createAction, createSlice, PrepareAction} from '@reduxjs/toolkit';
import {User} from '../../types/user';

export interface UserState {
  userData: User;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userData: {
    name: '',
    surname: '',
    email: '',
    profilePicture: '',
  },
  isLoggedIn: false,
};

export const setIsLoggedIn = createAction<PrepareAction<boolean>>(
  'user/setIsLoggedIn',
  isLoggedIn => ({
    payload: isLoggedIn,
  }),
);

export const setUser = createAction<PrepareAction<User>>(
  'user/setUser',
  user => ({
    payload: user,
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
    builder.addCase(setUser, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export default userSlice.reducer;
