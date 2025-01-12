// src/components/Navbar.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { logout } from "../redux/AuthSlice";
import clearAllReports from "../redux/ReportsSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      dispatch(clearAllReports);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-b from-indigo-700 to-indigo-500 border-b-2 border-indigo-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white font-extrabold text-4xl tracking-tight hover:text-indigo-200 transition duration-300">
              Aduan Banjir Masyarakat
            </Link>
            <div className="hidden sm:flex sm:space-x-6">
              <Link
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "text-white font-semibold border-b-4 border-white"
                    : "text-gray-200 hover:text-white"
                } text-lg font-medium inline-flex items-center px-2 py-1 transition-colors duration-300`}
              >
                Dashboard
              </Link>
              {user && (
                <Link
                  to="/create-report"
                  className={`${
                    location.pathname === "/create-report"
                      ? "text-white font-semibold border-b-4 border-white"
                      : "text-gray-200 hover:text-white"
                  } text-lg font-medium inline-flex items-center px-2 py-1 transition-colors duration-300`}
                >
                  Buat Aduan
                </Link>
              )}
              {user && (
                <Link
                  to="/user-report"
                  className={`${
                    location.pathname === "/user-report"
                      ? "text-white font-semibold border-b-4 border-white"
                      : "text-gray-200 hover:text-white"
                  } text-lg font-medium inline-flex items-center px-2 py-1 transition-colors duration-300`}
                >
                  Aduan Saya
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white font-medium text-sm mr-3">
                  Selamat Datang, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-x-6">
                <Link
                  to="/login"
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
