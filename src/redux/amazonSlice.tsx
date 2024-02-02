import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // products:[],
    userInfo:null
}

export const amazonSlice = createSlice({
    name:"amazon",
    initialState,
    reducers: {
      setUserInfo:(state,action)=>{
        state.userInfo = action.payload
      },
      userSignOut:(state)=>{
        state.userInfo = null
      }
    },
})

export const {setUserInfo,userSignOut} = amazonSlice.actions
export default amazonSlice.reducer