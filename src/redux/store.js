// import { applyMiddleware, compose, createStore, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import dataReducer from "./data/dataReducer";

// const rootReducer = combineReducers({
//   // blockchain: blockchainReducer,
//   data: dataReducer,
// });

// const middleware = [thunk];
// const composeEnhancers = compose(applyMiddleware(...middleware));

// const configureStore = () => {
//   return createStore(rootReducer, composeEnhancers);
// };

// const store = configureStore();

// export default store;

import { configureStore } from '@reduxjs/toolkit';

import blockchainReducer from './blockchainSlice';

const store = configureStore({
  reducer: {
    blockchain: blockchainReducer
  },
})

export default store;
