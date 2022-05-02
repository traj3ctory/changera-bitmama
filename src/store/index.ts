import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./AuthPage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {auth: authReducer.State}
export type AppDispatch = typeof store.dispatch