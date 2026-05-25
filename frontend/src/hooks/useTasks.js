import { useState, useEffect } from "react";
import {
  fetchAllTasks,
  addTask,
  editTask,
  toggleTask,
  removeTask,
  filterTasks,
} from "../services/taskService";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Tasks load 
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Task add 
  async function handleAdd(taskData) {
    try {
      const newTask = await addTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  // Task toggle 
  async function handleToggle(task) {
    try {
      const updated = await toggleTask(task);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...updated, ...{ category: t.category, priority: t.priority } } : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  // Task edit 
  async function handleEdit(id, title, description) {
    try {
      const updated = await editTask(id, { title, description });
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  // Task delete 
  async function handleDelete(id) {
    try {
      await removeTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  // Filtered tasks
  const filteredTasks = filterTasks(tasks, { filter, categoryFilter, searchQuery });

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    setError,
    filter, setFilter,
    categoryFilter, setCategoryFilter,
    searchQuery, setSearchQuery,
    handleAdd,
    handleToggle,
    handleEdit,
    handleDelete,
  };
}