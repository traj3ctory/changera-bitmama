import { createSlice } from "@reduxjs/toolkit";
import { initialStateType } from "./Types";

const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) as string;

const auth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: isLoggedIn || false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    proxy_url: process.env.REACT_APP_PROXY_URL
  } as initialStateType,
  reducers: {
    LOGIN(state, action) {
        localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn,
          user: action.payload.user
        };
      },
    LOGOUT(state, action) {
        localStorage.clear()
        return {
          ...state,
          isLoggedIn: false,
          user: null
        }; 
      },
  },
});

export const { LOGIN, LOGOUT } = auth.actions;
export default auth.reducer