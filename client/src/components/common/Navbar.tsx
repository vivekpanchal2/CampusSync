import React, { useState } from "react";
import { TfiAlignJustify, TfiAlignRight } from "react-icons/tfi";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import { logout } from "../../services/operations/AuthApi";
import { TbLogout } from "react-icons/tb";
import { BiSolidDashboard } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const currentPage = useLocation().pathname;

  console.log(currentPage);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Clubs", href: "/clubs" },
    { name: "Events", href: "/events" },
    { name: "About", href: "#" },
  ];

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <nav className="fixed top-0 w-full h-[4.5rem] bg-gray-950 border-gray-200 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"} className="flex items-center space-x-3">
          <span className="self-center text-xl font-semibold md:text-2xl whitespace-nowrap text-white">
            CampusSync
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden "
        >
          {isOpen ? (
            <TfiAlignRight className="h-2/3 w-full" />
          ) : (
            <TfiAlignJustify className="h-2/3 w-full" />
          )}
        </button>

        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 text-white border-gray-100 rounded-lg bg-gray-700 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-950">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 text-white hover:bg-gray-100 hover:text-black md:hover:bg-transparent  md:hover:text-blue-700 md:pb-1 ${
                    currentPage == `${link.href}`
                      ? "text-blue-700 border-b-2 border-blue-700"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <div className="md:hidden">
              {!user ? (
                <div className="mt-2">
                  <button
                    className="w-full mb-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={"/Auth"}>Sign In</Link>
                  </button>
                  <button
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={"/Auth"} onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </button>
                </div>
              ) : (
                <div>
                  {user.role == "Admin" ? (
                    <Link
                      to={"/dashboard"}
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to={"/dashboard/enrolled"}
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    >
                      Dashboard
                    </Link>
                  )}

                  <div className="flex items-center justify-between space-x-3 py-4  border-t-2 mt-3">
                    <div className="flex items-center space-x-5">
                      <img
                        src={user?.profileImage}
                        alt="User profile"
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                      />
                      <span className="text-white text-lg font-semibold">
                        {user.name}
                      </span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                    >
                      logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ul>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                <Link to={"/Auth"}>Join Us</Link>
              </button>
            </>
          ) : (
            <div className="group relative flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src={user.profileImage}
                  alt="User profile"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                <span className="text-white text-lg font-semibold">
                  {user.name}
                </span>
                <div>
                  <FaAngleDown className="text-white" />
                </div>
              </div>

              <div className="absolute top-10 right-3 hidden group-hover:flex flex-col items-start  h-[8rem] w-[10rem] rounded-lg shadow-lg py-6 px-3 ">
                {user.role == "Admin" ? (
                  <button
                    onClick={() => navigate("/admin/dashboard/events")}
                    className="bg-slate-700  text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors duration-200 ease-in-out flex items-center justify-between w-full"
                  >
                    <BiSolidDashboard className="text-lg" />
                    Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/dashboard/enrolled")}
                    className="bg-slate-700  text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors duration-200 ease-in-out flex items-center justify-between w-full"
                  >
                    <BiSolidDashboard className="text-lg" />
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 mt-2  text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 ease-in-out flex w-full items-center gap-x-3 "
                >
                  <TbLogout /> Logout
                </button>

                <div className="absolute top-3 -z-10 bg-slate-400 h-6 w-6 rotate-45 right-14"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
