

import { useState, useEffect } from "react";
import { Camera, User, Lock, Calendar, CheckCircle, Trophy, Target, Zap } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BottomNav from "../components/button-nav.component";
import { getTasks } from "../api/tasks";
import { uploadAvatar, getAvatar } from "../services/uploadService";
import { updateUserProfile } from "../api/users";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [saved, setSaved] = useState(false);
  const [avatar, setAvatar] = useState(getAvatar());
  const [uploading, setUploading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "Syeda"
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function load() {
      try {
        const data = await getTasks(token);
        setTasks(Array.isArray(data) ? data : data.tasks || []);
      } catch (err) {}
    }
    load();
  }, [token]);

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const imageUrl = await uploadAvatar(file);
      setAvatar(imageUrl);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    try {
      const updates = {};
      if (username) updates.username = username;

      await updateUserProfile(updates);

      // save in localStorage
      localStorage.setItem("username", username);

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert("Failed to Save: " + err.message);
    }
  }

  const total = tasks.length;
  const done = tasks.filter((t) => t.is_completed).length;
  const remaining = tasks.filter((t) => !t.is_completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const achievements = [
    { icon: <Target size={20} className="text-yellow-400" />, label: "First Task", desc: total >= 1 ? "Unlocked! ✦" : "Locked", done: total >= 1 },
    { icon: <Zap size={20} className="text-yellow-400" />, label: "5 Tasks Done", desc: done >= 5 ? "Unlocked! ✦" : "Locked", done: done >= 5 },
    { icon: <Trophy size={20} className="text-yellow-400" />, label: "10 Tasks Done", desc: done >= 10 ? "Unlocked! ✦" : "Locked", done: done >= 10 },
    { icon: <CheckCircle size={20} className="text-yellow-400" />, label: "All Complete", desc: total > 0 && remaining === 0 ? "Unlocked! ✦" : "Locked", done: total > 0 && remaining === 0 },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-60 min-w-0">
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />
        <div className="p-4 md:p-6 max-w-lg mx-auto pb-36">
          <div className="mb-5 mt-2">
            <h2 className="text-xl font-black text-white">Profile <span className="text-yellow-400">✦</span></h2>
            <p className="text-sm text-gray-600 mt-0.5">Manage your account</p>
          </div>

          {/* Profile Card */}
          <div className="bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden mb-4">
            <div className="h-24 bg-yellow-400" />
            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-10 mb-4">
                <div className="relative">
                  {avatar ? (
                    <img src={avatar} alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-4 border-black shadow-lg" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-yellow-400 border-4 border-black shadow-lg flex items-center justify-center text-3xl font-black text-black">
                      {username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-yellow-300 transition-colors">
                    <Camera size={14} className="text-black" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                {uploading && <span className="text-xs text-yellow-400 font-medium">Uploading...</span>}
              </div>

              <h3 className="text-lg font-black text-white">{username}</h3>
              <p className="text-xs text-gray-600 mb-5">Member since May 2026</p>

              <div className="border-t border-gray-800 pt-5 flex flex-col gap-3">
                {/* Username */}
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-2xl">
                  <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
                    <User size={16} className="text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-0.5">Username</p>
                    <input
                      className="text-sm font-semibold text-white bg-transparent outline-none w-full"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-2xl">
                  <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
                    <Lock size={16} className="text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-0.5">New Password</p>
                    <input
                      className="text-sm font-semibold text-white bg-transparent outline-none w-full"
                      type="password"
                      placeholder="Leave blank to keep same"
                    />
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-2xl">
                  <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={16} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-0.5">Member Since</p>
                    <p className="text-sm font-semibold text-white">May 2026</p>
                  </div>
                </div>

                {/* Save Button */}
                <button onClick={handleSave}
                  className={`w-full flex items-center justify-between rounded-2xl px-6 py-4 transition-all group ${
                    saved ? "bg-green-400" : "bg-gray-900 border border-gray-800 hover:border-yellow-400"
                  }`}>
                  <span className={`font-semibold text-sm ${saved ? "text-black" : "text-white"}`}>
                    {saved ? "✓ Saved!" : "Save Changes"}
                  </span>
                  {!saved && (
                    <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-black font-bold">→</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-white">Task Stats</span>
              <span className="text-xs text-yellow-400 font-semibold bg-yellow-400 bg-opacity-10 px-2 py-1 rounded-lg">
                {percent}% Done
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-900 rounded-2xl p-3 text-center">
                <p className="text-xl font-black text-white">{total}</p>
                <p className="text-xs text-gray-600 mt-0.5">Total</p>
              </div>
              <div className="bg-gray-900 rounded-2xl p-3 text-center">
                <p className="text-xl font-black text-yellow-400">{done}</p>
                <p className="text-xs text-gray-600 mt-0.5">Done</p>
              </div>
              <div className="bg-gray-900 rounded-2xl p-3 text-center">
                <p className="text-xl font-black text-red-400">{remaining}</p>
                <p className="text-xs text-gray-600 mt-0.5">Left</p>
              </div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full transition-all duration-700"
                style={{ width: `${percent}%` }} />
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5">
            <span className="text-sm font-bold text-white block mb-4">Achievements</span>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((a, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                  a.done ? "bg-yellow-400 bg-opacity-10 border-yellow-400 border-opacity-30" : "bg-gray-900 border-gray-800 opacity-40"
                }`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    a.done ? "bg-yellow-400 bg-opacity-20" : "bg-gray-800"
                  }`}>
                    {a.icon}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${a.done ? "text-white" : "text-gray-600"}`}>{a.label}</p>
                    <p className="text-xs text-gray-600">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}