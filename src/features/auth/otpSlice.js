import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../api/apiConstants";

// 🔹 Async thunk for OTP verify
export const verifyOtp = createAsyncThunk(
  "otp/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp);

      const response = await axios.post(API.OTP_VERIFY, formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    loading: false,
    success: false,
    error: null,
    message: "",
  },
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        if (action.payload.status === "success") {
          state.success = true;
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;