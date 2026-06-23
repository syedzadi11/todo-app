

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsBar from "../components/StatsBar";
import TaskCard from "../components/TaskCard";
import EditModal from "../components/EditModal";
import BottomNav from "../components/ButtonNav";
import { useTasks } from "../hooks/useTasks";
import { getGreeting } from "../utils/helpers";

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    tasks,
    filteredTasks,
    loading,
    error,
    setError,
    filter, setFilter,
    categoryFilter, setCategoryFilter,
    handleToggle,
    handleEdit,
    handleDelete,
  } = useTasks();

  const categories = ["all", "personal", "study", "health", "shopping"];

  const categoryColors = {
    all: "bg-gray-800 text-gray-400",
    personal: "bg-purple-900 text-purple-300",
    study: "bg-orange-900 text-orange-300",
    health: "bg-green-900 text-green-300",
    shopping: "bg-pink-900 text-pink-300",
  };

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-60 min-w-0">
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearch={(q) => { setSearchQuery(q); }}
        />

        <div className="p-4 md:p-6 max-w-xl mx-auto pb-36">
          <div className="mb-5 mt-2">
            <h2 className="text-xl font-black text-white">
              {getGreeting()}, Syeda! <span className="text-yellow-400">✦</span>
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Calendar Strip */}
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-4 mb-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-white">
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
              <span className="text-xs text-yellow-400 font-semibold">This Week</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - 3 + i);
                const isToday = i === 3;
                return (
                  <div key={i} className={`flex flex-col items-center min-w[44px] py-2.5 px-1 rounded-2xl transition-all cursor-pointer ${isToday ? "bg-yellow-400" : "hover:bg-gray-800"}`}>
                    <span className={`text-xs font-medium mb-1 ${isToday ? "text-black" : "text-gray-600"}`}>
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                    <span className={`text-base font-bold ${isToday ? "text-black" : "text-gray-300"}`}>
                      {date.getDate()}
                    </span>
                    {isToday && <div className="w-1.5 h-1.5 bg-black rounded-full mt-1 opacity-50" />}
                  </div>
                );
              })}
            </div>
          </div>

          <StatsBar tasks={tasks} />

          {error && (
            <div className="bg-red-900 bg-opacity-30 border border-red-800 rounded-2xl px-4 py-3 mb-4 flex items-center justify-between">
              <p className="text-red-400 text-sm">⚠️ {error}</p>
              <button onClick={() => setError("")} className="text-red-600 ml-3">✕</button>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all border ${
                  categoryFilter === cat ? "bg-yellow-400 text-black border-yellow-400" : `${categoryColors[cat]} border-transparent`
                }`}>{cat}</button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 mb-5 bg-gray-950 p-1 rounded-2xl border border-gray-800">
            {["all", "active", "done"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filter === f ? "bg-yellow-400 text-black" : "text-gray-600 hover:text-gray-400"
                }`}>{f}</button>
            ))}
          </div>

          {/* Tasks */}
          <div className="bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-800 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Tasks</span>
              <span className="text-xs text-gray-600">{filteredTasks.length} tasks</span>
            </div>
            <div className="p-3">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-yellow-400 text-2xl mb-2">✦</p>
                  <p className="text-sm text-gray-600">Loading tasks...</p>
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-3xl mb-2">📭</p>
                  <p className="text-sm text-gray-600">No tasks yet. Tap + to add!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onEdit={setEditTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/add-task")}
        className="fixed bottom-20 right-6 lg:bottom-6 w-14 h-14 bg-yellow-400 hover:bg-yellow-300 text-black rounded-full shadow-xl shadow-yellow-900 flex items-center justify-center transition-all active:scale-95 z-40"
      >
        <Plus size={24} />
      </button>

      <EditModal
        task={editTask}
        onSave={async (id, title, description) => {
          await handleEdit(id, title, description);
          setEditTask(null);
        }}
        onClose={() => setEditTask(null)}
      />
      <BottomNav />
    </div>
  );
}