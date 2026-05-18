import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resetOtpState } from "../../features/auth/otpSlice.js";
import { useNavigate, useLocation } from "react-router-dom";

function OtpVerify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, success, message } = useSelector(
    (state) => state.otp
  );

  // ✅ get email from navigation state
  const emailFromPrevPage = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: emailFromPrevPage,
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.otp) return;

    dispatch(verifyOtp(formData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetOtpState());
        navigate("/reset-password");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 shadow-lg rounded w-96 bg-white"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Verify OTP
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        {/* OTP */}
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Message */}
        {message && (
          <p className="mt-3 text-center text-sm text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default OtpVerify;