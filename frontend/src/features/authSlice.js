import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkApi) => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        return thunkApi.rejectWithValue(errorMessage);
      }
    }
  }
);

export const User = createAsyncThunk("user/User", async (_, thunkApi) => {
  try {
    const response = await axios.get("http://localhost:4000/user");
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
});

export const LogoutUser = createAsyncThunk("user/LogoutUser", async () => {
  await axios.delete("http://localhost:4000/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    });
    builder.addCase(LoginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });

    // Get User Login extraReducers: (builder) => {
    builder.addCase(User.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(User.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    });
    builder.addCase(User.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
