


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  fetchAllTasks,
  addTask,
  editTask,
  toggleTask,
  removeTask,
  filterTasks,
} from "../services/taskService";

export function useTasks() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  // Fetch all tasks
  const { data: tasks = [], isLoading: loading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchAllTasks,
    onError: (err) => setError(err.message),
  });

  // Add task
  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    onError: (err) => setError(err.message),
  });

  // Edit task
  const editMutation = useMutation({
    mutationFn: ({ id, updates }) => editTask(id, updates),
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    onError: (err) => setError(err.message),
  });

  // Toggle task
  const toggleMutation = useMutation({
    mutationFn: toggleTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    onError: (err) => setError(err.message),
  });

  // Delete task
  const deleteMutation = useMutation({
    mutationFn: removeTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    onError: (err) => setError(err.message),
  });

  // Handler functions
  async function handleAdd(taskData) {
    await addMutation.mutateAsync(taskData);
    return true;
  }

  async function handleEdit(id, title, description) {
    await editMutation.mutateAsync({ id, updates: { title, description } });
    return true;
  }

  async function handleToggle(task) {
    await toggleMutation.mutateAsync(task);
  }

  async function handleDelete(id) {
    await deleteMutation.mutateAsync(id);
  }

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