import { useState } from "react";
import axios from "axios";
import { API } from "../../api/apiConstants";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {

    if (!formData.email || !formData.password) {
      setMessage("Email and Password required");
      return;
    }

    try {

      setLoading(true);
      setMessage("");

     const res = await axios.post(API.LOGIN, formData, {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  transformRequest: [(data) => {
    return new URLSearchParams(data).toString();
  }],
});

  console.log("FULL RESPONSE:", res);
console.log("RESPONSE DATA:", res.data);

      setLoading(false);

      // 🔥 IMPORTANT FIX (MATCH PHP: status)
      if (res.data.status === "success") {

        // store user in redux
        dispatch(loginSuccess(res.data.user));

        setMessage(res.data.message || "Login successful");

        // go to home page
        navigate("/");

      } else {

        setMessage(res.data.message || "Login failed");

      }

    } catch (error) {

      setLoading(false);
      console.log(error);
      setMessage("Server Error");

    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow-md w-80">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#0F4C81] text-white py-2 rounded hover:bg-[#0F4C81]"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p className="text-center text-sm mt-3 text-red-500">
            {message}
          </p>
        )}

        {/* LINKS */}
        <div className="mt-4 text-center text-sm">

          <p className="mb-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold">
              Signup
            </Link>
          </p>

          <p>
            <Link to="/forgot" className="text-blue-600 font-semibold">
              Forgot Password?
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;