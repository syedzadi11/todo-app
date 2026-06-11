

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Flag, Bell, Tag } from "lucide-react";
import { useTasks } from "../hooks/use-tasks.hook";
import { scheduleReminder } from "../utils/helpers";

export default function AddTask() {
  const navigate = useNavigate();
  const { handleAdd } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("personal");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [reminder, setReminder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    { value: "personal", label: "Personal", active: "bg-purple-400 text-black border-purple-400" },
    { value: "study", label: "Study", active: "bg-orange-400 text-black border-orange-400" },
    { value: "health", label: "Health", active: "bg-green-400 text-black border-green-400" },
    { value: "shopping", label: "Shopping", active: "bg-pink-400 text-black border-pink-400" },
  ];

  const priorities = [
    { value: "high", label: "High", active: "bg-red-400 text-black border-red-400", dot: "bg-red-400" },
    { value: "medium", label: "Medium", active: "bg-yellow-400 text-black border-yellow-400", dot: "bg-yellow-400" },
    { value: "low", label: "Low", active: "bg-green-400 text-black border-green-400", dot: "bg-green-400" },
  ];

  async function handleSubmit() {
    if (!title.trim()) { setError("Title zaroori hai!"); return; }
    if (title.trim().length < 3) { setError("Title 3 characters se zyada hona chahiye!"); return; }
    if (reminder && (!dueDate || !dueTime)) { setError("Reminder ke liye date aur time dono select karo!"); return; }

    setLoading(true);
    setError("");

    const success = await handleAdd({ title: title.trim(), description: description.trim(), category, priority, dueDate, dueTime, reminder });

    if (success) {
      if (reminder && dueDate && dueTime) scheduleReminder(title.trim(), dueDate, dueTime);
      navigate("/dashboard");
    } else {
      setError("Task add nahi hua!");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-gray-800 sticky top-0 z-10">
        <div className="flex items-center px-4 py-4 gap-3 max-w-xl mx-auto">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-900">
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <h1 className="text-lg font-black text-white flex-1">Add Task</h1>
          <button onClick={handleSubmit} disabled={loading}
            className="bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-yellow-300 disabled:opacity-50">
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="p-4 max-w-xl mx-auto pb-10">
        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-800 rounded-2xl px-4 py-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Title */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 mb-4">
          <input className="w-full text-base font-semibold text-white outline-none placeholder-gray-700 bg-transparent mb-3"
            placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          <div className="border-t border-gray-800 pt-3">
            <textarea className="w-full text-sm text-gray-400 outline-none placeholder-gray-700 resize-none bg-transparent"
              placeholder="Description (Optional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
        </div>

        {/* Category */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
              <Tag size={16} className="text-yellow-400" />
            </div>
            <span className="text-sm font-bold text-white">Category</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button key={cat.value} onClick={() => setCategory(cat.value)}
                className={`py-2.5 px-4 rounded-2xl text-sm font-semibold border-2 transition-all ${
                  category === cat.value ? cat.active : "bg-gray-900 text-gray-600 border-transparent hover:border-gray-700"
                }`}>{cat.label}</button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
              <Flag size={16} className="text-yellow-400" />
            </div>
            <span className="text-sm font-bold text-white">Priority</span>
          </div>
          <div className="flex gap-2">
            {priorities.map((p) => (
              <button key={p.value} onClick={() => setPriority(p.value)}
                className={`flex-1 py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all flex items-center justify-center gap-1.5 ${
                  priority === p.value ? p.active : "bg-gray-900 text-gray-600 border-transparent hover:border-gray-700"
                }`}>
                <div className={`w-2 h-2 rounded-full ${priority === p.value ? "bg-black" : p.dot}`} />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Due Date + Time */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
              <Calendar size={16} className="text-yellow-400" />
            </div>
            <span className="text-sm font-bold text-white">Due Date & Time</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-gray-900 rounded-2xl px-4 py-3">
              <span className="text-sm text-gray-600">Date</span>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
                className="text-sm text-yellow-400 font-semibold outline-none bg-transparent"
                min={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="flex items-center justify-between bg-gray-900 rounded-2xl px-4 py-3">
              <span className="text-sm text-gray-600">Time</span>
              <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)}
                className="text-sm text-yellow-400 font-semibold outline-none bg-transparent" />
            </div>
          </div>
        </div>

        {/* Reminder */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
                <Bell size={16} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Reminder</p>
                <p className="text-xs text-gray-600">
                  {reminder && dueDate && dueTime ? `${dueDate} at ${dueTime}` : "Date aur time select karo"}
                </p>
              </div>
            </div>
            <button onClick={() => setReminder(!reminder)}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative ${reminder ? "bg-yellow-400" : "bg-gray-800"}`}>
              <div className={`w-5 h-5 rounded-full shadow-md absolute top-0.5 transition-all duration-300 ${reminder ? "left-6 bg-black" : "left-0.5 bg-gray-600"}`} />
            </button>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className="w-full flex items-center justify-between bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4 hover:border-yellow-400 transition-all group disabled:opacity-50">
          <span className="text-white font-semibold text-sm">{loading ? "Adding..." : "Add Task"}</span>
          <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-black font-bold text-lg">→</span>
          </div>
        </button>
      </div>
    </div>
  );
}