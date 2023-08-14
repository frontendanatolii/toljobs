import { createSlice } from "@reduxjs/toolkit";

export const loadersSlice = createSlice({
  name: 'loaders',
  initialState: {
    isLoading: false
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
});

export const { setIsLoading } = loadersSlice.actions;
export default loadersSlice.reducer;