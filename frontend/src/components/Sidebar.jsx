

import { NavLink, useNavigate } from "react-router-dom";
import { CheckSquare, Calendar, BarChart2, User, LogOut } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    navigate("/get-started");
  }

  const navItems = [
    { to: "/dashboard", icon: <CheckSquare size={18} />, label: "Tasks" },
    { to: "/calendar", icon: <Calendar size={18} />, label: "Calendar" },
    { to: "/stats", icon: <BarChart2 size={18} />, label: "Stats" },
    { to: "/profile", icon: <User size={18} />, label: "Profile" },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-20 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-gray-950 border-r border-gray-800 z-30
        flex flex-col transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="px-5 py-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center">
              <span className="text-black font-black text-lg">✦</span>
            </div>
            <div>
              <h1 className="text-sm font-black text-white">TaskFlow</h1>
              <p className="text-xs text-gray-600">Stay organized</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 mt-2 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all
                ${isActive
                  ? "bg-yellow-400 text-black font-bold"
                  : "text-gray-500 hover:bg-gray-900 hover:text-white"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-gray-600 hover:bg-gray-900 hover:text-red-400 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}