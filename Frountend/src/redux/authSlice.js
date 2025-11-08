import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null
  },

  reducers: {
    setLoading: (currentState, action) => {
      currentState.loading = action.payload;
    },

    setUser: (currentState, action) => {
      currentState.user = action.payload;
    }
  },
});
export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
