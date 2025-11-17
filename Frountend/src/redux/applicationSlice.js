import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState:{
    applicants: null
  },
   reducers:{
    
    setApplicants: (currentState, action)=>{
      currentState.applicants = action.payload
    },

   }
})

export const { setApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;