


export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.is_completed).length;
  const remaining = tasks.filter((t) => !t.is_completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="mb-6">
      {/* Progress Card */}
      <div className="bg-yellow-400 rounded-3xl p-5 mb-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-black text-xs font-semibold opacity-70">Today's Progress</p>
            <p className="text-black text-2xl font-black mt-0.5">{percent}% Done</p>
          </div>
          <div className="w-14 h-14 bg-black bg-opacity-10 rounded-2xl flex items-center justify-center text-3xl">
            🎯
          </div>
        </div>

        {/* Progress bar — gray background, white fill */}
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

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-white">{total}</p>
          <p className="text-xs text-gray-600 mt-1">Total</p>
        </div>
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-yellow-400">{done}</p>
          <p className="text-xs text-gray-600 mt-1">Done</p>
        </div>
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-red-400">{remaining}</p>
          <p className="text-xs text-gray-600 mt-1">Left</p>
        </div>
      </div>
    </div>
  );
}