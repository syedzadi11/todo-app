


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Flag, Bell, Tag, Trash2, CheckCircle, FileText } from "lucide-react";
import { fetchTaskById, editTask, removeTask } from "../services/taskService";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTaskById(id);
        setTask(data.task || data);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    }
    load();
  }, [id]);

  async function handleToggle() {
    try {
      const updated = await editTask(id, { is_completed: !task.is_completed });
      setTask(updated.task || updated);
    } catch (err) { setError(err.message); }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await removeTask(id);
      navigate("/dashboard");
    } catch (err) { setError(err.message); }
  }

  const extras = JSON.parse(localStorage.getItem("taskExtras") || "{}");
  const taskExtras = extras[id] || {};
  const priority = taskExtras.priority || "medium";
  const category = taskExtras.category || "personal";
  const dueDate = taskExtras.dueDate || "";
  const dueTime = taskExtras.dueTime || "";
  const reminder = taskExtras.reminder || false;

  const categoryColors = {
    personal: "bg-purple-900 text-purple-300",
    study: "bg-orange-900 text-orange-300",
    health: "bg-green-900 text-green-300",
    shopping: "bg-pink-900 text-pink-300",
  };

  const priorityColors = { high: "text-red-400", medium: "text-yellow-400", low: "text-green-400" };
  const priorityDots = { high: "bg-red-400", medium: "bg-yellow-400", low: "bg-green-400" };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-yellow-400">✦ Loading...</p>
    </div>
  );

  if (error || !task) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-red-400 text-sm">{error || "Task not found!"}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-gray-800 sticky top-0 z-10">
        <div className="flex items-center px-4 py-4 gap-3 max-w-xl mx-auto">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-900 transition-colors">
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <h1 className="text-lg font-black text-white flex-1">Task Details</h1>
          <button onClick={handleDelete} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-900 transition-colors">
            <Trash2 size={18} className="text-red-400" />
          </button>
        </div>
      </div>

      <div className="p-4 max-w-xl mx-auto pb-10">
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6 mb-4 text-center">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <h2 className={`text-xl font-black mb-2 ${task.is_completed ? "line-through text-gray-600" : "text-white"}`}>
            {task.title}
          </h2>
          <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${categoryColors[category] || "bg-gray-800 text-gray-400"}`}>
            {category}
          </span>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 mb-4">
          <h3 className="text-sm font-bold text-white mb-4">Details</h3>
          <div className="flex flex-col divide-y divide-gray-800">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-yellow-400" />
                <span className="text-sm text-gray-500">Due Date</span>
              </div>
              <span className="text-sm font-semibold text-white">
                {dueDate ? new Date(dueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Not set"}
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-yellow-400" />
                <span className="text-sm text-gray-500">Time</span>
              </div>
              <span className="text-sm font-semibold text-white">
                {dueTime ? new Date(`2000-01-01T${dueTime}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }) : "Not set"}
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Flag size={16} className="text-yellow-400" />
                <span className="text-sm text-gray-500">Priority</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${priorityDots[priority]}`} />
                <span className={`text-sm font-semibold capitalize ${priorityColors[priority]}`}>{priority}</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Bell size={16} className="text-yellow-400" />
                <span className="text-sm text-gray-500">Reminder</span>
              </div>
              <span className="text-sm font-semibold text-white">
                {reminder && dueTime ? new Date(`2000-01-01T${dueTime}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }) : reminder ? "On" : "Off"}
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Tag size={16} className="text-yellow-400" />
                <span className="text-sm text-gray-500">Category</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${categoryColors[category]}`}>{category}</span>
            </div>

            {task.description && (
              <div className="flex items-start justify-between py-3">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-yellow-400" />
                  <span className="text-sm text-gray-500">Description</span>
                </div>
                <span className="text-sm text-gray-300 max-w-[55%] text-right leading-relaxed">{task.description}</span>
              </div>
            )}

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-gray-600" />
                <span className="text-sm text-gray-500">Created</span>
              </div>
              <span className="text-sm font-semibold text-white">
                {new Date(task.created_at || task.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>

        <button onClick={handleToggle}
          className={`w-full py-4 rounded-2xl text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 mb-3 ${
            task.is_completed ? "bg-gray-900 text-gray-400 border border-gray-800" : "bg-yellow-400 text-black"
          }`}>
          <CheckCircle size={18} />
          {task.is_completed ? "Mark as Active" : "Mark as Completed"}
        </button>

        <button onClick={handleDelete}
          className="w-full py-4 rounded-2xl text-sm font-semibold text-red-400 bg-gray-950 border border-gray-800 hover:border-red-800 transition-all flex items-center justify-center gap-2">
          <Trash2 size={18} />
          Delete Task
        </button>
      </div>
    </div>
  );
}