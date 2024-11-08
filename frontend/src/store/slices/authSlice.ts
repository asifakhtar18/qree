import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface AuthState {
  name: string;
  email: string;
  profilePic: string;
  token: string;
  phoneNumber: string;
  address: string;
  _id: string;
}

const initialState: AuthState = {
  name: "",
  email: "",
  profilePic: "",
  token: "",
  phoneNumber: "",
  address: "",
  _id: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<AuthState, "token">>) => {
      const { name, email, profilePic, phoneNumber, address, _id } =
        action.payload;
      state.name = name;
      state.email = email;
      state.profilePic = profilePic;
      state.phoneNumber = phoneNumber;
      state.address = address;
      state._id = _id;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateProfilePic: (state, action: PayloadAction<string>) => {
      state.profilePic = action.payload;
    },

    logout: () => initialState,
  },
});

export const { setUser, setToken, updateProfilePic, logout } =
  authSlice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = createSelector(
  (state: RootState) => state.auth,
  (auth) => ({
    name: auth.name,
    email: auth.email,
    profilePic: auth.profilePic,
    phoneNumber: auth.phoneNumber,
    address: auth.address,
    _id: auth._id,
  })
);

export default authSlice;
