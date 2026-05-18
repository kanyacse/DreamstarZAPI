import axios from "axios";

import { API } from "../api/apiConstants";

export const loginApi = async (data) => {

  const response = await axios.post(
    API.LOGIN,
    data
  );

  return response.data;

};

export const signupApi = async (data) => {

  const response = await axios.post(
    API.SIGNUP,
    data
  );

  return response.data;

};

export const otpVerifyApi = async (data) => {

  const response = await axios.post(
    API.OTP_VERIFY,
    data
  );

  return response.data;

};