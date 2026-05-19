import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OtpVerify from "../pages/auth/OtpVerify";
import Profile from "../pages/profile/Profile";
import ResetPassword from "../pages/auth/ResetPassword"
import EditProfile from "../pages/auth/EditProfile"

import ProtectedRoutes from "./ProtectedRoutes";

function AppRoutes() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/otp_verify" element={<OtpVerify />} />
           <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/edit-profile" element={<EditProfile />} />

          {/* 🔒 Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;