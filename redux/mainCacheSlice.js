import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  namzData: null,
  DateTime: null,
};

export const mainCacheSlice = createSlice({
  name: "mainCache",
  initialState: initialState,
  reducers: {
    reset: (state, action) => {
      Object.assign(state, initialState);
    },
    updatenamzData: (state, action) => {
      state.namzData = action.payload ? action.payload : "";
      console.log("////store", state);
      // var currentTime = Date.now();
      // state.pFundUpdateDateTime = moment(Date.now()).format(
      //   "YYYY-MMM-DD HH:mm:ss"
      // );
      // console.log(state);
    },
  },
});

export const { updatenamzData, DateTime } = mainCacheSlice.actions;

export default mainCacheSlice.reducer;
