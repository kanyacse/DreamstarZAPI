import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import forgotPasswordReducer from "../features/auth/forgotPasswordSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
  
  },
});