import { useState } from "react";
import axios from "axios";
import { API } from "../../api/apiConstants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";

function Signup() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {

    if (!form.name || !form.email || !form.password) {
      setMessage("All fields are required");
      return;
    }

    if (!form.email.includes("@")) {
      setMessage("Email must contain @ symbol");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    try {

      setLoading(true);
      setMessage("");

      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("password", form.password);

      const now = new Date();

      const date_time =
  now.getFullYear() + "-" +
  String(now.getMonth() + 1).padStart(2, "0") + "-" +
  String(now.getDate()).padStart(2, "0") + " " +
  now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
      data.append("date_time", date_time);

      const res = await axios.post(API.SIGNUP, data);

      setLoading(false);

      if (res.data.status === "success") {

        setMessage(res.data.message || "Signup successful");

        dispatch(loginSuccess(res.data.user || form));

        navigate("/");

      } else {
        setMessage(res.data.message || "Signup failed");
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
          Create Account
        </h2>

        <p className="text-gray-500 text-center mb-4 text-sm">
          Sign up to get started
        </p>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 mb-3 rounded"
          value={form.name}
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={form.email}
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={form.password}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-[#0F4C81] text-white py-2 rounded hover:bg-[#0F4C81]"
        >
          {loading ? "Creating Account..." : "Signup"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p className="text-center text-sm mt-3 text-red-500">
            {message}
          </p>
        )}

        {/* LOGIN LINK */}
        <div className="mt-4 text-center text-sm">

          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;