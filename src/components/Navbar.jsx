import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">LockSafe</h1>

      <ul
        className={`md:flex flex-col items-center gap-3 py-3 md:space-x-6 absolute md:static text-white bg-gray-800 md:bg-transparent w-full md:w-auto left-0 top-[64px] md:top-0 transition-all duration-300 ease-in-out ${menuOpen ? "flex" : "hidden"
          }`}
      >
        <li className="text-base md:text-xl font-semibold">
          <div className="flex md:flex-row flex-col items-center gap-4">

            <Link
              to="/"
              className="md:bg-blue-600 md:text-white md:px-4 md:py-2 md:rounded md:hover:bg-blue-700 md:transition"
            >
              Home
            </Link>

            {isLoggedIn && (
              <Link
                to="/passwords"
                className="md:bg-green-600 md:text-white md:px-4 md:py-2 md:rounded md:hover:bg-green-700 md:transition"
              >
                Passwords
              </Link>
            )}
            {isLoggedIn && (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  window.location.href = "/"; // redirect to homepage
                }}
                className=" cursor-pointer md:border md:border-red-600 md:text-red-600 md:px-4 md:py-2 md:rounded md:hover:bg-red-600 md:hover:text-white transition"
              >
                Logout
              </button>
            )}
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className=" md:bg-gray-200 md:border-blue-600 md:text-blue-600 md:px-4 md:py-2 md:rounded md:hover:bg-blue-600 md:hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="md:bg-blue-600  md:text-white md:px-4 md:py-2 md:rounded md:hover:bg-blue-700 md:transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </li>
      </ul>

      <button
        className="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none"
        onClick={toggleMenu}
      >
        <span className="block w-full h-0.5 bg-black"></span>
        <span className="block w-full h-0.5 bg-black"></span>
        <span className="block w-full h-0.5 bg-black"></span>
      </button>
    </header>
  );
};

export default Navbar;
