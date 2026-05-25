



import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const navigate = useNavigate();
  const date = task.created_at || task.createdAt;
  const taskId = task.id || task._id;

  const categoryColors = {
    personal: "bg-purple-900 text-purple-300",
    study: "bg-orange-900 text-orange-300",
    health: "bg-green-900 text-green-300",
    shopping: "bg-pink-900 text-pink-300",
  };

  const priorityDots = {
    high: "bg-red-400",
    medium: "bg-yellow-400",
    low: "bg-green-400",
  };

  const priorityColors = {
    high: "text-red-400",
    medium: "text-yellow-400",
    low: "text-green-400",
  };

  return (
    <div
      onClick={() => taskId && navigate(`/task/${taskId}`)}
      className={`flex items-start gap-3 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
        task.is_completed
          ? "bg-gray-900 border-gray-800 opacity-60"
          : "bg-gray-900 border-gray-800 hover:border-yellow-400"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(task); }}
        className={`w-6 h-6 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          task.is_completed
            ? "bg-yellow-400 border-yellow-400"
            : "border-gray-700 hover:border-yellow-400"
        }`}
      >
        {task.is_completed && (
          <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${task.is_completed ? "line-through text-gray-600" : "text-white"}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-gray-600 mt-1 truncate">{task.description}</p>
        )}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {task.category && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${
              categoryColors[task.category] || "bg-gray-800 text-gray-400"
            }`}>{task.category}</span>
          )}
          {task.priority && (
            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${priorityDots[task.priority]}`} />
              <span className={`text-xs font-semibold capitalize ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
            </div>
          )}
          {date && (
            <span className="text-xs text-gray-700">
              {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          )}
        </div>
      </div>

      {/* Status */}
      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${
        task.is_completed ? "bg-yellow-400 text-black" : "bg-gray-800 text-gray-400"
      }`}>
        {task.is_completed ? "Done" : "Active"}
      </span>

      {/* Buttons */}
      <div className="flex gap-1 shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(task); }}
          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-800 text-gray-600 hover:text-yellow-400 transition-colors"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(taskId); }}
          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-800 text-gray-600 hover:text-red-400 transition-colors"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}