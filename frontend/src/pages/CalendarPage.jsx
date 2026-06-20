


import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BottomNav from "../components/ButtonNav";
import { getTasks } from "../api/tasks";

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const token = localStorage.getItem("token");

  const today = new Date();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  useEffect(() => {
    async function load() {
      try {
        const data = await getTasks(token);
        setTasks(Array.isArray(data) ? data : data.tasks || []);
      } catch (err) {}
    }
    load();
  }, [token]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: firstDay }, () => null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const isToday = (day) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  const isSelected = (day) => day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();

  const selectedTasks = tasks.filter((t) => {
    const d = new Date(t.created_at || t.createdAt);
    return d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
  });

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-60 min-w-0 flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} searchQuery={searchQuery} onSearch={setSearchQuery} />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-32">
          <div className="max-w-xl mx-auto">
            <div className="mb-5 mt-2">
              <h2 className="text-xl font-black text-white">Calendar <span className="text-yellow-400">✦</span></h2>
              <p className="text-sm text-gray-600 mt-0.5">View tasks by date</p>
            </div>

            {/* Calendar */}
            <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setSelectedDate(new Date(year, month - 1, 1))} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-800 text-gray-500 text-lg">‹</button>
                <span className="text-sm font-bold text-white">
                  {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <button onClick={() => setSelectedDate(new Date(year, month + 1, 1))} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-800 text-gray-500 text-lg">›</button>
              </div>
              <div className="grid grid-cols-7 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-gray-700 py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => (
                  <div key={i} onClick={() => day && setSelectedDate(new Date(year, month, day))}
                    className={`aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
                      !day ? "" :
                      isSelected(day) ? "bg-yellow-400 text-black font-bold cursor-pointer" :
                      isToday(day) ? "bg-gray-800 text-yellow-400 font-bold cursor-pointer" :
                      "hover:bg-gray-800 text-gray-400 cursor-pointer"
                    }`}>
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Tasks */}
            <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-white">
                  {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                </span>
                <span className="text-xs text-yellow-400 font-semibold bg-yellow-400 bg-opacity-10 px-2 py-1 rounded-lg">
                  {selectedTasks.length} tasks
                </span>
              </div>
              {selectedTasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-2xl mb-2">📭</p>
                  <p className="text-sm text-gray-600">No tasks for this day</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {selectedTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-900 rounded-2xl">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${task.is_completed ? "bg-yellow-400 border-yellow-400" : "border-gray-700"}`}>
                        {task.is_completed && (
                          <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${task.is_completed ? "line-through text-gray-600" : "text-white"}`}>{task.title}</p>
                        {task.description && <p className="text-xs text-gray-600 mt-0.5">{task.description}</p>}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${task.is_completed ? "bg-yellow-400 text-black" : "bg-gray-800 text-gray-400"}`}>
                        {task.is_completed ? "Done" : "Active"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}