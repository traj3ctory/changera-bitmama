import { createSlice } from "@reduxjs/toolkit";
import { initialStateType } from "./Types";

const getLoggedInStatus = localStorage.getItem("isLoggedIn");
const getIsLoggedIn = getLoggedInStatus === "true" ? true : false;
const getUser = localStorage.getItem("user");
const getUserData = getUser ? JSON.parse(getUser) : null;

const auth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: getIsLoggedIn || (false as initialStateType["isLoggedIn"]),
    user: getUserData || null,
    repos: [],
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    proxy_url: process.env.REACT_APP_PROXY_URL,
  } as initialStateType,
  reducers: {
    LOGIN(state, action) {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    },
    SET_REPO(state, action) {
      return {
        ...state,
        repos: action.payload,
      };
    },
    LOGOUT(state) {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    },
  },
});

export const { LOGIN, LOGOUT, SET_REPO } = auth.actions;
export default auth.reducer;
