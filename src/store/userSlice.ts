import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import { CreateUser } from "../types/User";
import { LoginResponce, User, UserShema } from "../types/User";
import { UserCredentials } from "../types/User";
import { BASE_URL } from "../utils/constants";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (newUser: CreateUser, thunkAPI) => {
    try {
      const result = await axios.post<UserShema>(`${BASE_URL}/users`, newUser);
      const user = result.data;
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (cred: UserCredentials, thunkAPI) => {
    try {
      const result = await axios.post<LoginResponce>(
        `${BASE_URL}/auth/login`,
        cred
      );
      const { access_token } = result.data;
      const getProfile = await axios.get<UserShema>(
        `${BASE_URL}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const user = getProfile.data;
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("user", JSON.stringify(user));
      return getProfile.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const authenticateUserAsync = createAsyncThunk<
  User,
  { rejectValue: string }
>("authenticateUserAsync", async (access_token, { rejectWithValue }) => {
  try {
    const getprofile = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return getprofile.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

const initialState: User = { // UserReducerState
  currentUser: null,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        sessionStorage.setItem("user", JSON.stringify(payload));
        state.error = false; 
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.error = true; 
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        sessionStorage.setItem("user", JSON.stringify(payload));
        state.error = false; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.error = true; 
      });
  },
});


export const { clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
