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

    try {

      setLoading(true);
      setMessage("");

      //  CREATE FORM DATA 
      const data = new FormData();

      data.append("name", form.name);
      data.append("email", form.email);
      data.append("password", form.password);

     
      const now = new Date();

         const date_time =

           now.getDate().toString().padStart(2, "0") + "-" +
         (now.getMonth() + 1).toString().padStart(2, "0") + "-" +
  now.getFullYear() + " " +
  now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });


data.append("date_time", date_time);

    const res = await axios.post(API.SIGNUP, data);

      console.log("SIGNUP RESPONSE:", res.data);

      setLoading(false);

      // CHECK BACKEND STATUS 
      if (res.data.status === "success") {

        setMessage(res.data.message || "Signup successful");

        // 🔥 AUTO LOGIN AFTER SIGNUP
        dispatch(loginSuccess(res.data.user || form));

        // redirect to home
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Sign up to get started
        </p>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded-xl mb-4"
          value={form.name}
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full border p-3 rounded-xl mb-4"
          value={form.email}
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-6"
          value={form.password}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-[#0F4C81] text-white py-3 rounded-xl"
        >
          {loading ? "Creating Account..." : "Signup"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p className="text-center mt-4 text-sm text-red-500">
            {message}
          </p>
        )}

        {/* LOGIN LINK */}
        <p className="text-center mt-6 text-sm text-gray-600">
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
  );
}

export default Signup;