import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaCalendarCheck, FaUserFriends, FaCalendarAlt } from "react-icons/fa"; // Icons

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"enrolled" | "hosted" | "clubs">(
    "enrolled"
  );

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
          } md:relative md:translate-x-0 md:w-1/4 md:top-0`}
        >
          <h2 className="text-2xl font-bold text-white mb-8">My Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="enrolled"
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                  activeTab === "enrolled"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveTab("enrolled");
                  setIsSidebarOpen(false);
                }}
              >
                <FaCalendarCheck className="mr-2" /> Enrolled Events
              </Link>
            </li>
            <li>
              <Link
                to="hosted"
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                  activeTab === "hosted"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveTab("hosted");
                  setIsSidebarOpen(false);
                }}
              >
                <FaCalendarAlt className="mr-2" /> Hosted Events
              </Link>
            </li>
            <li>
              <Link
                to="clubs"
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                  activeTab === "clubs"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveTab("clubs");
                  setIsSidebarOpen(false);
                }}
              >
                <FaUserFriends className="mr-2" /> Joined Clubs
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

        <div className="w-full md:w-3/4 p-4 ml-auto h-[calc(100vh-4.5rem)] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
