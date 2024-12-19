import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingSlice = createSlice({
  name: "GlobalLoading",
  initialState: {
    loading: false
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setGlobalLoading
} = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;