import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, clearState } from "../../features/auth/forgotPasswordSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, status } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  // Navigate to OTP page when API returns success
  useEffect(() => {
    if (status === "success") {
      dispatch(clearState()); // reset slice before leaving
      navigate("/otp_verify", { state: { email } });
    }
  }, [status]);

  const handleSendOtp = () => {
    if (!email) return;
    dispatch(sendOtp(email));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white shadow-md rounded w-80">

        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full bg-[#0F4C81] text-white p-2"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        {status === "error" && message && (
          <p className="text-center mt-3 text-sm text-red-500">{message}</p>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;