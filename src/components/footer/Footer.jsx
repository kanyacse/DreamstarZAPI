import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#0F4C81] text-white">

      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-6">

        <Link to="/" className="hover:underline">
          Home
        </Link>

        <Link to="/products" className="hover:underline">
          Products
        </Link>

        <Link to="/categories" className="hover:underline">
          Categories
        </Link>

        <Link to="/wishlist" className="hover:underline">
          Wishlist
        </Link>

        <Link to="/cart" className="hover:underline">
          Cart
        </Link>

      </div>

    </footer>
  );
}

export default Footer;