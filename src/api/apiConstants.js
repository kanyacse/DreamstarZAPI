// src/api/apiConstants.js

const BASE_URL = "http://localhost/api_folder/";

export const API = {
  LOGIN: `${BASE_URL}auth/login.php`,
  SIGNUP: `${BASE_URL}auth/signup.php`,
  OTP_VERIFY: `${BASE_URL}auth/verify_otp.php`,
  FORGOT_PASSWORD: `${BASE_URL}auth/forget_password.php`,
  RESET_PASSWORD: `${BASE_URL}auth/reset_password.php`,

  VIEW_BANNER: `${BASE_URL}banner_api/view_banner.php`,
  OFFER_BANNER: `${BASE_URL}offer_banner_api/view_banner.php`,
  DISCOUNT_BANNER: `${BASE_URL}discount_banner_api/get_single_discount_banner.php`,
  OCCASION_BANNER: `${BASE_URL}occasion_banner_api/get_single_occasion_banner.php`,
};