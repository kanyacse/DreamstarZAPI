import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import ForgotPassword from"../pages/auth/ForgotPassword";
import OtpVerify from "../pages/auth/OtpVerify";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

      
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
           <Route path="/forgot" element={<ForgotPassword />} />
           <Route path="/otp_verify" element={<OtpVerify />} />


        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;