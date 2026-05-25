import { useNavigate } from "react-router-dom";

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between px-6 py-12">

      {/* Top decoration */}
      <div className="w-full flex justify-end">
        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Star icon */}
        <div className="text-yellow-400 text-5xl mb-8">✦</div>

        <h1 className="text-4xl font-black text-white leading-tight mb-4">
          Your Daily<br />
          <span className="text-yellow-400">Productivity</span><br />
          Starts Here
        </h1>

        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
          Plan tasks, stay focused, and achieve your goals with simple daily organization.
        </p>
      </div>

      {/* Bottom buttons */}
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center justify-between bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4 mb-3 hover:border-yellow-400 transition-all group"
        >
          <span className="text-white font-semibold text-sm">Get Started</span>
          <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-black font-bold text-lg">→</span>
          </div>
        </button>

        <button
          onClick={() => navigate("/register")}
          className="w-full text-center text-gray-500 text-sm py-2 hover:text-yellow-400 transition-colors"
        >
          New here? Create account
        </button>
      </div>
    </div>
  );
}