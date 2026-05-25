

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsBar from "../components/StatsBar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import EditModal from "../components/EditModal";
import BottomNav from "../components/BottomNav";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks(token);
        setTasks(Array.isArray(data) ? data : data.tasks || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, [token]);

  async function handleAdd(title, description) {
    try {
      const data = await createTask(token, title, description);
      setTasks((prev) => [...prev, data.task || data]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(task) {
    try {
      const data = await updateTask(token, task.id, {
        is_completed: !task.is_completed,
      });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? data : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEditSave(id, title, description) {
    try {
      const data = await updateTask(token, id, { title, description });
      setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
      setEditTask(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(token, id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const filtered = tasks
    .filter((t) =>
      filter === "all" ? true : filter === "done" ? t.is_completed : !t.is_completed
    )
    .filter((t) =>
      searchQuery
        ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
        : true
    );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-60 min-w-0">
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />

        <div className="p-4 md:p-6 max-w-xl mx-auto pb-36">
          <div className="mb-5 mt-2">
            <h2 className="text-xl font-bold text-gray-900">My Tasks</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long", month: "long", day: "numeric"
              })}
            </p>
          </div>

          {/* Calendar Strip */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 mb-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-800">
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
              <span className="text-xs text-blue-500 font-semibold">This Week</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - 3 + i);
                const isToday = i === 3;
                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center min-w[44px] py-2.5 px-1 rounded-2xl transition-all cursor-pointer ${
                      isToday
                        ? "bg-blue-500 shadow-lg shadow-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className={`text-xs font-medium mb-1 ${
                      isToday ? "text-blue-100" : "text-gray-400"
                    }`}>
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                    <span className={`text-base font-bold ${
                      isToday ? "text-white" : "text-gray-700"
                    }`}>
                      {date.getDate()}
                    </span>
                    {isToday && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-1 opacity-70" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <StatsBar tasks={tasks} />

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-4 flex items-center justify-between">
              <p className="text-red-500 text-sm">⚠️ {error}</p>
              <button onClick={() => setError("")} className="text-red-300 hover:text-red-500 ml-3">✕</button>
            </div>
          )}

          {/* Filter */}
          <div className="flex gap-2 mb-5 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
            {["all", "active", "done"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filter === f
                    ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >{f}</button>
            ))}
          </div>

          {/* Tasks */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Tasks</span>
              <span className="text-xs text-gray-400">{filtered.length} tasks</span>
            </div>

            <div className="p-3">
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-2xl mb-2">⏳</div>
                  <p className="text-sm text-gray-400">Loading tasks...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-3xl mb-2">📭</div>
                  <p className="text-sm text-gray-400">
                    {searchQuery ? "No tasks found!" : "No tasks yet. Tap + to add!"}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filtered.map((task) => (
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

      <TaskForm onAdd={handleAdd} />
      <EditModal
        task={editTask}
        onSave={handleEditSave}
        onClose={() => setEditTask(null)}
      />
      <BottomNav />
    </div>
  );
}