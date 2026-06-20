
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BottomNav from "../components/ButtonNav";
import { getTasks } from "../api/tasks";

export default function StatsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function load() {
      try {
        const data = await getTasks(token);
        setTasks(Array.isArray(data) ? data : data.tasks || []);
      } catch (err) {}
    }
    load();
  }, [token]);

  const total = tasks.length;
  const done = tasks.filter((t) => t.is_completed).length;
  const active = tasks.filter((t) => !t.is_completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayTasks = tasks.filter((t) => {
      const d = new Date(t.created_at || t.createdAt);
      return d.toDateString() === date.toDateString();
    });
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      total: dayTasks.length,
      done: dayTasks.filter((t) => t.is_completed).length,
    };
  });

  const maxVal = Math.max(...last7Days.map((d) => d.total), 1);

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-60 min-w-0">
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />

        <div className="p-4 md:p-6 max-w-xl mx-auto pb-36">
          <div className="mb-5 mt-2">
            <h2 className="text-xl font-black text-white">
              Activity Insights <span className="text-yellow-400">✦</span>
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">Your productivity summary</p>
          </div>

          {/* Main Progress Card */}
          <div className="bg-yellow-400 rounded-3xl p-5 mb-4">
            <p className="text-black text-xs font-semibold opacity-70 mb-1">Daily Completion</p>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-black text-black">{percent}%</span>
              <span className="text-black opacity-60 text-sm mb-1">{done} of {total} tasks done</span>
            </div>

            {/* Progress bar */}
            <div className="w-full rounded-full h-3 bg-yellow-200">
              <div
                className="h-3 rounded-full transition-all duration-700 bg-black"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-black opacity-50">0%</span>
              <span className="text-xs text-black opacity-50">100%</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-white">{total}</p>
              <p className="text-xs text-gray-600 mt-1">Total</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-yellow-400">{done}</p>
              <p className="text-xs text-gray-600 mt-1">Completed</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-red-400">{active}</p>
              <p className="text-xs text-gray-600 mt-1">Remaining</p>
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 mb-4">
            <h3 className="text-sm font-bold text-white mb-4">Weekly Trend</h3>
            <div className="flex items-end justify-between gap-2 h-28">
              {last7Days.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center justify-end" style={{ height: "80px" }}>
                    <div
                      className="w-full rounded-t-lg transition-all duration-500 bg-yellow-400"
                      style={{ height: `${(d.done / maxVal) * 80}px`, minHeight: d.done > 0 ? "4px" : "0" }}
                    />
                    <div
                      className="w-full rounded-t-lg bg-gray-800"
                      style={{ height: `${((d.total - d.done) / maxVal) * 80}px`, minHeight: (d.total - d.done) > 0 ? "4px" : "0" }}
                    />
                  </div>
                  <span className="text-xs text-gray-700">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-yellow-400 rounded-sm" />
                <span className="text-xs text-gray-600">Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-gray-800 rounded-sm" />
                <span className="text-xs text-gray-600">Remaining</span>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">Recent Tasks</h3>
            {tasks.length === 0 ? (
              <p className="text-center text-gray-600 text-sm py-4">No tasks yet!</p>
            ) : (
              <div className="flex flex-col gap-2">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-900 rounded-2xl">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${task.is_completed ? "bg-yellow-400" : "bg-gray-700"}`} />
                    <p className={`text-sm flex-1 ${task.is_completed ? "line-through text-gray-600" : "text-gray-300"}`}>
                      {task.title}
                    </p>
                    <span className={`text-xs font-semibold ${task.is_completed ? "text-yellow-400" : "text-gray-600"}`}>
                      {task.is_completed ? "Done" : "Active"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}