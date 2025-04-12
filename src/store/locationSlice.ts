import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialOrigin } from '../constants/initialOrigin'
import { LocationType } from '../types'

const locationSlice = createSlice({
  name: 'location',
  initialState: initialOrigin,
  reducers: {
    setLocation(
      state: LocationType,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    },
  },
})

export const { setLocation } = locationSlice.actions
export default locationSlice.reducer
