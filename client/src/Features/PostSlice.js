import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initialize the initial state
const initialState = {
  value: [],
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};
 
// Thunk for registering a user
export const register = createAsyncThunk("users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://postitapp-server-ql42.onrender.com/register`, {
        fristname: userData.fristname,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for logging in a user
export const login = createAsyncThunk("users/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://postitapp-server-ql42.onrender.com/login`, {
      email: userData.email,
      password: userData.password,
    });
    return response.data.user;
  } catch (error) {
    return rejectWithValue("Invalid credentials");
  }
});

// Thunk for logging out a user
export const logout = createAsyncThunk("users/logout", async () => {
  try {
    await axios.post(`https://postitapp-server-ql42.onrender.com/logout`);
    return {};
  } catch (error) {
    console.error(error);
  }
});

// Thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://postitapp-server-ql42.onrender.com/updateUserProfile/${userData.email}`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Profile update failed");
    }
  }
);

// Define the slice
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default userSlice.reducer;
