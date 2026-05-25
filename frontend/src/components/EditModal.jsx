


import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) { setTitle(task.title); setDescription(task.description || ""); }
  }, [task]);

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-end">
      <div className="bg-gray-950 border border-gray-800 w-full rounded-t-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-white">Edit Task</h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-gray-500 hover:text-white">
            <X size={16} />
          </button>
        </div>
        <input
          className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3.5 text-sm text-white outline-none focus:border-yellow-400 placeholder-gray-600 mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <textarea
          className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3.5 text-sm text-white outline-none focus:border-yellow-400 placeholder-gray-600 resize-none mb-5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={2}
        />
        <div className="flex gap-3">
          <button
            onClick={() => onSave(task.id, title, description)}
            className="flex-1 bg-yellow-400 text-black font-bold py-4 rounded-2xl text-sm transition-all"
          >Save Changes</button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-900 text-gray-400 font-semibold py-4 rounded-2xl text-sm hover:text-white transition-all"
          >Cancel</button>
        </div>
      </div>
    </div>
  );
}