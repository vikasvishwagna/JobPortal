import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name:"company",
  initialState:{
    singleCompany:null,
    companies:[],
    searchCompanyByText:'',
    updatedCompanyData:null,
  },
  
  reducers:{

    setSingleCompany:(currentState, action)=>{
      currentState.singleCompany = action.payload
    },

    setCompanies:(currentState, action)=>{
      currentState.companies = action.payload
    },

    setSearchCompanyByText:(currentState, action)=>{
      currentState.searchCompanyByText = action.payload
    },

    setUpdatedCompanyData: (currentState, action)=>{
      currentState.updatedCompanyData = action.payload
    }

  }
});

export const { setSingleCompany,
   setCompanies,
   setSearchCompanyByText,
   setUpdatedCompanyData
   } = companySlice.actions;
export default companySlice.reducer;