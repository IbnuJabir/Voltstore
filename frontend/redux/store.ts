"use client";
import { configureStore } from "@reduxjs/toolkit";
import { productsApiSlice } from "./slices/productsApiSlice";
import { userApiSlice } from "./slices/userApiSlice"; // Import usersApiSlice
import authReducer from "./slices/authSlice";
import { ordersApiSlice } from './slices/ordersApiSlice';
export const store = configureStore({
  reducer: {
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer, // Add usersApiSlice reducer
    [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(productsApiSlice.middleware)
      .concat(userApiSlice.middleware) // Add usersApiSlice middleware
      .concat(ordersApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
