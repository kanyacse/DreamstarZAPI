import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  LogOut,
  Edit,
  Bell,
  Settings,
  Trash2,
} from "lucide-react";

function Profile() {

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const updatedUser = {
          ...user,
          image: reader.result,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
      };

      reader.readAsDataURL(file);
    }
  };

  // IMAGE DELETE
  const handleDeleteImage = () => {
    const updatedUser = {
      ...user,
      image: "",
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-yellow-50 flex flex-col md:flex-row">

      {/* SIDEBAR */}
      <div className="w-full md:w-24 bg-gray-50 flex md:flex-col flex-row justify-around md:justify-start items-center py-3 md:py-10 gap-6 md:gap-8">

        <div className="bg-blue-100 p-2 md:p-3 rounded-xl text-blue-600">
          <User size={22} />
        </div>

        <div className="text-gray-400 hover:text-blue-500 cursor-pointer p-2 md:p-3 rounded-xl transition">
          <Bell size={22} />
        </div>

        <div className="text-gray-400 hover:text-blue-500 cursor-pointer p-2 md:p-3 rounded-xl transition">
          <Settings size={22} />
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 md:p-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div>
            <h1 className="text-xl md:text-3xl font-bold text-gray-800">
              Welcome, {user?.name}
            </h1>

            <p className="text-gray-400 text-sm md:text-base mt-1">
              Manage your profile information
            </p>
          </div>

          {/* TOP IMAGE */}
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">

            {user?.image ? (
              <img
                src={user.image}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={26} className="text-gray-500" />
            )}

          </div>

        </div>

        {/* BANNER */}
        <div className="h-20 md:h-28 rounded-2xl bg-gradient-to-r from-blue-200 via-gray-100 to-yellow-100 mb-6"></div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">

          {/* USER INFO */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5 mb-8">

            {/* IMAGE */}
            <div className="relative">

              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">

                {user?.image ? (
                  <img
                    src={user.image}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={35} className="text-gray-500" />
                )}

              </div>

              {user?.image ? (
                <button
                  onClick={handleDeleteImage}
                  className="absolute bottom-0 right-0 bg-red-500 text-white p-1 md:p-2 rounded-full"
                >
                  <Trash2 size={14} />
                </button>
              ) : (
                <label className="absolute bottom-0 right-0 bg-[#0F4C81] text-white p-1 md:p-2 rounded-full cursor-pointer">

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                  <Edit size={14} />
                </label>
              )}

            </div>

            {/* USER DETAILS */}
            <div className="text-center md:text-left">

              <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
                {user?.name}
              </h2>

              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mt-2 text-sm md:text-base">
                <Mail size={16} />
                <p>{user?.email}</p>
              </div>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            <Link
              to="/edit-profile"
              className="bg-[#0F4C81] hover:bg-[#0a3b63] text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Edit size={18} />
              Edit Profile
            </Link>

            <Link
              to="/reset-password"
              className="bg-[#0F4C81] hover:bg-[#0a3b63] text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              Reset Password
            </Link>

            <button
              onClick={() => dispatch(logout())}
              className="bg-[#0F4C81] hover:bg-[#0a3b63] text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;