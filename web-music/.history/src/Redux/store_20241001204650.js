import { configureStore } from '@reduxjs/toolkit';
import userReducer from './sliders/userSlide'; 

const store = configureStore({
  reducer: {
    user: userReducer, // Reducer 
  },
});


export default store;
