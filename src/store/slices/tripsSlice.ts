import {createAction, createSlice, PrepareAction} from '@reduxjs/toolkit';
import { Trip } from '../../types/trip';

export interface TripsState {
  trips: Trip[];
  isLoading: boolean;
}

const initialState: TripsState = {
    trips: [],
    isLoading: false,
};

export const setTrips = createAction<PrepareAction<Trip[]>>(
  'trips/setTrips',
  trips => ({
    payload: trips,
  }),
);

export const setIsLoading = createAction<PrepareAction<boolean>>(
  'user/setIsLoading',
  isLoading => ({
    payload: isLoading,
  }),
);

export const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setIsLoading, (state, action) => {
      state.isLoading = action.payload;
    });
    builder.addCase(setTrips, (state, action) => {
      state.trips = action.payload;
    });
  },
});

export default tripsSlice.reducer; 
