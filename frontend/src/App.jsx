

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CalendarPage from "./pages/CalendarPage";
import StatsPage from "./pages/StatsPage";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import GetStarted from "./pages/GetStarted";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/get-started" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/get-started" />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
      <Route path="/stats" element={<PrivateRoute><StatsPage /></PrivateRoute>} />
      <Route path="/add-task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
      <Route path="/task/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
    </Routes>
  );
}