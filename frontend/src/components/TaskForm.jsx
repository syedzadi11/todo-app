

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("personal");
  const [priority, setPriority] = useState("medium");
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit() {
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim(), category, priority);
    setTitle("");
    setDescription("");
    setCategory("personal");
    setPriority("medium");
    setIsOpen(false);
  }

  const categories = [
    { value: "work", label: "Work", color: "bg-blue-100 text-blue-600" },
    { value: "personal", label: "Personal", color: "bg-purple-100 text-purple-600" },
    { value: "study", label: "Study", color: "bg-orange-100 text-orange-600" },
  ];

  const priorities = [
    { value: "high", label: "High", color: "text-red-500" },
    { value: "medium", label: "Medium", color: "text-yellow-500" },
    { value: "low", label: "Low", color: "text-green-500" },
  ];

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-6 lg:bottom-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-xl shadow-blue-300 flex items-center justify-center transition-all active:scale-95 z-40"
        >
          <Plus size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-800">New Task</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <X size={16} />
              </button>
            </div>

            <input
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-400 mb-3"
              placeholder="Task title (min 3 characters)..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />

            <textarea
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-400 resize-none mb-3"
              placeholder="Description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />

            {/* Category */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">Category</p>
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border-2 ${
                      category === cat.value
                        ? `${cat.color} border-current`
                        : "bg-gray-50 text-gray-400 border-transparent"
                    }`}
                  >{cat.label}</button>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 mb-2">Priority</p>
              <div className="flex gap-2">
                {priorities.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPriority(p.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border-2 ${
                      priority === p.value
                        ? `${p.color} bg-gray-50 border-current`
                        : "bg-gray-50 text-gray-400 border-transparent"
                    }`}
                  >{p.label}</button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-2xl text-sm shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </>
  );
}