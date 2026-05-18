import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBox,
  faThList,
  faHeart,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;

  return (

    <header className="fixed top-0 left-0 w-full bg-[#0F4C81] shadow-lg z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-white text-2xl font-bold">
          DreamStarz
        </div>

        {/* BEFORE LOGIN */}
        {!isLoggedIn && (
          <div className="flex items-center gap-4">
            <span className="text-white">Welcome 👋</span>

            <Link
              to="/login"
              className="bg-white bg-[#0F4C81] px-4 py-2 rounded-xl font-semibold"
            >
              🔐 Login
            </Link>
          </div>
        )}

        {/* AFTER LOGIN */}
        {isLoggedIn && (
          <>
            {/* MENU */}
            <nav className="flex items-center gap-8 text-white font-medium">

              <Link to="/" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>

              <Link to="/products" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBox} /> Products
              </Link>

              <Link to="/categories" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faThList} /> Categories
              </Link>

              <Link to="/wishlist" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faHeart} /> Wishlist
              </Link>

              <Link to="/profile" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} /> Profile
              </Link>

              <Link to="/cart" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </Link>

            </nav>

            {/* LOGOUT */}
            <button
              onClick={() => dispatch(logout())}
              className="text-white font-semibold hover:underline"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </header>
  );
}

export default Navbar;