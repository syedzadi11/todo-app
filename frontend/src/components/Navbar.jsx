

import { Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ onMenuClick, searchQuery, onSearch }) {
  const avatar = localStorage.getItem("avatar");
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric"
  });

  return (
    <div className="bg-black border-b border-gray-800 sticky top-0 z-10">
      {/* Main navbar */}
      <div className="flex items-center px-4 py-3 gap-3">
        <button
          onClick={onMenuClick}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-900 transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Date — left side */}
        {!showSearch && (
          <div className="flex-1">
            <p className="text-xs text-gray-500">Today</p>
            <p className="text-sm font-bold text-white">{dateStr}</p>
          </div>
        )}

        {/* Search — expandable */}
        {showSearch && (
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-yellow-400 placeholder-gray-600"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              autoFocus
            />
          </div>
        )}

        {/* Right icons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => { setShowSearch(!showSearch); if (showSearch) onSearch(""); }}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:border-yellow-400 hover:text-yellow-400 transition-all"
          >
            <Search size={16} />
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="shrink-0"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-yellow-400"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-black text-sm font-black">
                S
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}