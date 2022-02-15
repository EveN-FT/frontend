import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  loading: false,
  account: null,
  errorMsg: "",
}


export const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    connectRequest: (state) => {
      state.loading = true;
    },
    connectSuccess: (state, action) => {
      state.loading = false;
      state.account = action.payload.account;
      state.smartContract = action.payload.smartContract;
    },
    connectFailed: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
    updateAccount: (state, action) => {
      state.account = action.payload.account;
    },
  }
})

export const { connectRequest, connectSuccess, connectFailed, updateAccount } = blockchainSlice.actions;

export default blockchainSlice.reducer;