
import { NavLink } from "react-router-dom";
import { CheckSquare, Calendar, BarChart2, User } from "lucide-react";

export default function BottomNav() {
  const navItems = [
    { to: "/dashboard", icon: <CheckSquare size={20} />, label: "Tasks" },
    { to: "/calendar", icon: <Calendar size={20} />, label: "Calendar" },
    { to: "/stats", icon: <BarChart2 size={20} />, label: "Stats" },
    { to: "/profile", icon: <User size={20} />, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-30 lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all ${
                isActive ? "text-yellow-400" : "text-gray-600 hover:text-gray-400"
              }`
            }
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}