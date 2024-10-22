import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaBuilding } from "react-icons/fa";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>();

  const location = useLocation().pathname;

  useEffect(() => {
    const currentOpenTab = location.split("/").at(-1);
    setCurrentTab(currentOpenTab || "");
  }, [location]);

  return (
    <div className="mt-[4.5rem]">
      <div className="md:hidden p-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed z-20 top-[4.5rem] left-0 w-64 h-[calc(100vh-4.5rem)] bg-gray-900 text-white p-4 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:w-1/4 md:top-0 md:border-r-2 md:border-gray-700`}
        >
          <h2 className="text-2xl font-bold text-white mb-8">
            Admin Dashboard
          </h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="users" // Use Link for navigation
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                  currentTab == "users" ? "border-l-4 border-blue-700" : ""
                }`}
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Manage Users"
              >
                <FaUsers className="mr-2" /> All Users
              </Link>
            </li>
            <li>
              <Link
                to="events"
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors duration-300  ${
                  currentTab == "events" ? "border-l-4 border-blue-700" : ""
                }`}
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Manage Events"
              >
                <FaCalendarAlt className="mr-2" /> All Events
              </Link>
            </li>
            <li>
              <Link
                to="clubs" // Use Link for navigation
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors duration-300  ${
                  currentTab == "clubs" ? "border-l-4 border-blue-700" : ""
                }`}
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Manage Clubs"
              >
                <FaBuilding className="mr-2" /> All Clubs
              </Link>
            </li>
          </ul>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content with Outlet */}
        <div className="w-full md:w-3/4 p-4 ml-auto h-[calc(100vh-4.5rem)] overflow-auto">
          <div className="mt-8 px-6">
            <Outlet /> {/* Render the child components here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
