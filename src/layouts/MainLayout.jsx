import Navbar from "../components/header/Navbar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* ALWAYS VISIBLE */}
      <Navbar />

      {/* BODY (IMPORTANT FIX HERE) */}
      <main className="flex-1 pt-[80px]">
        <Outlet />
      </main>

      {/* ALWAYS VISIBLE */}
      <Footer />

    </div>
  );
}

export default MainLayout;