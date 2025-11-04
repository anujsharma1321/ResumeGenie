import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaUserAlt,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../Authenticate/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  console.log("Navbar user:", user);

  // Helper to close menus on navigation
  const handleNavigate = (path) => {
    navigate(path);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Helper to close menus on logout
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    // Added z-50 to ensure navbar is on top
    <nav className="relative z-50 flex items-center justify-between px-4 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg md:px-8">
      {/* Logo */}
      <div
        onClick={() => handleNavigate("/")}
        className="text-2xl font-extrabold tracking-wide cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-500 hover:scale-105 transition-transform"
      >
        ResumeGenie
      </div>

      {/* == Desktop Menu == */}
      {/* Hidden on mobile, flex on medium+ */}
      <div className="hidden md:flex space-x-4 items-center">
        {!user ? (
          <>
            <button
              className="px-4 py-2 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
              onClick={() => handleNavigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
              onClick={() => handleNavigate("/register")}
            >
              Signup
            </button>
          </>
        ) : (
          <div className="relative">
            {/* Profile button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaUserCircle className="text-2xl text-indigo-400" />
              <span className="font-medium">{user.name}</span>
            </button>

            {/* == Desktop Dropdown Menu == */}
            <div
              className={`absolute right-0 mt-3 w-56 bg-gray-800 bg-opacity-90 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl z-20 transition-all ease-out duration-200 transform
                ${
                  dropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              <button
                className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-t-lg hover:bg-gray-700 transition"
                onClick={() => handleNavigate("/profile")}
              >
                <FaUserAlt className="text-gray-400" />
                <span>Profile</span>
              </button>
              <button
                className="flex items-center space-x-3 w-full text-left px-4 py-3 hover:bg-gray-700 transition"
                onClick={() => handleNavigate("/resume-reviews")}
              >
                <FaFileAlt className="text-gray-400" />
                <span>Resume Reviews</span>
              </button>
              <button
                className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-b-lg hover:bg-gray-700 text-red-400 hover:text-red-300 transition"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

     
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-2xl p-2"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

     
      <div
        className={`absolute top-full left-0 right-0 md:hidden bg-gray-800 shadow-lg transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col space-y-2 p-4">
          {!user ? (
            <>
              <button
                className="w-full text-left px-4 py-3 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 transition-all"
                onClick={() => handleNavigate("/login")}
              >
                Login
              </button>
              <button
                className="w-full text-left px-4 py-3 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-500 transition-all"
                onClick={() => handleNavigate("/register")}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              {/* Added user name for mobile context */}
              <div className="px-4 py-3 text-gray-400">
                Hi, <span className="font-medium text-white">{user.name}</span>
              </div>
              <button
                className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition"
                onClick={() => handleNavigate("/profile")}
              >
                <FaUserAlt className="text-gray-400" />
                <span>Profile</span>
              </button>
              <button
                className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition"
                onClick={() => handleNavigate("/resume-reviews")}
              >
                <FaFileAlt className="text-gray-400" />
                <span>Resume Reviews</span>
              </button>
              <button
                className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 text-red-400 hover:text-red-300 transition"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;