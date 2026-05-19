import { useState } from "react";
import axios from "axios";
import { API } from "../../api/apiConstants";

function EditProfile() {
  const [form, setForm] = useState({
    email: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    if (!form.email || !form.name) {
      setIsSuccess(false);
      setMessage("All fields are required");
      return;
    }

    if (!form.email.includes("@")) {
      setIsSuccess(false);
      setMessage("Enter a valid email");
      return;
    }

    if (form.name.trim().length < 2) {
      setIsSuccess(false);
      setMessage("Name must be at least 2 characters");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        API.EDIT_PROFILE, 
        {
          email: form.email,
          name: form.name,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          transformRequest: [(data) => new URLSearchParams(data).toString()],
        }
      );

      if (res.data.status === "success") {
        setIsSuccess(true);
        setMessage(res.data.message || "Profile updated successfully");

        // optional: clear form
        setForm({ email: "", name: "" });
      } else {
        setIsSuccess(false);
        setMessage(res.data.message || "Update failed");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      {/* CARD */}
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-sm sm:max-w-md p-5 sm:p-6">

        {/* TITLE */}
        <h2 className="text-xl sm:text-2xl font-bold text-center">
          Edit Profile
        </h2>

        <p className="text-gray-500 text-center text-sm mt-1 mb-4">
          Update your name details
        </p>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full border p-2 sm:p-3 mb-3 rounded text-sm sm:text-base"
          value={form.email}
          onChange={handleChange}
        />

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="New Name"
          className="w-full border p-2 sm:p-3 mb-4 rounded text-sm sm:text-base"
          value={form.name}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="w-full bg-[#0F4C81] text-white py-2 sm:py-3 rounded hover:bg-[#0a3b63] transition text-sm sm:text-base"
        >
          {loading ? "Updating Profile..." : "Update Profile"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p
            className={`text-center mt-3 text-sm ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default EditProfile;