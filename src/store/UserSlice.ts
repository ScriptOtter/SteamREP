import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../services/apiService";
import { IUser } from "../models/IUser";

interface ISignIn {
  username: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: ISignIn): Promise<AxiosResponse<IUser>> => {
    const res = await axios.post(API_ENDPOINTS.signin, data, {
      withCredentials: true,
    });
    const { accessToken, refreshToken, ...userData } = res.data;
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  }
);

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        state.error = action.error.message;
      });
  },
  reducers: undefined,
});

export default userSlice.reducer;
