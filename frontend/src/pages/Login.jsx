

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.hook";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="text-yellow-400 text-4xl mb-3">✦</div>
          <h1 className="text-2xl font-black text-white">TaskFlow</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back</p>
        </div>

        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-800 rounded-2xl px-4 py-3 mb-4">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1">Username</label>
          <input
            className="w-full mt-2 bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3.5 text-sm text-white outline-none focus:border-yellow-400 placeholder-gray-600 transition-all"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1">Password</label>
          <input
            className="w-full mt-2 bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3.5 text-sm text-white outline-none focus:border-yellow-400 placeholder-gray-600 transition-all"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login(username, password)}
          />
        </div>

        <button
          onClick={() => login(username, password)}
          disabled={loading}
          className="w-full flex items-center justify-between bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4 hover:border-yellow-400 transition-all group disabled:opacity-50"
        >
          <span className="text-white font-semibold text-sm">{loading ? "Signing in..." : "Sign In"}</span>
          <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-black font-bold text-lg">→</span>
          </div>
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          No account?{" "}
          <Link to="/register" className="text-yellow-400 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
}