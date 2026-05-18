import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../api/apiConstants";

// Async thunk — calls your PHP API
export const sendOtp = createAsyncThunk(
  "forgotPassword/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        API.FORGOT_PASSWORD,
        new URLSearchParams({ email }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (res.data.status === "success") {
        return res.data; // fulfilled
      } else {
        return rejectWithValue(res.data.message); // e.g. "Email not registered"
      }
    } catch (err) {
      return rejectWithValue("Server error. Please try again.");
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    message: "",
    status: null, // "success" | "error" | null
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.message = "";
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.status = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.status = "success";
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.status = "error";
      });
  },
});

export const { clearState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;