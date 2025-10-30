import { useState, useEffect, useMemo } from 'react';
import * as api from '../utils/api';

export const useTasks = (user) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.getTasks();
      setTasks(response.data.data || response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await api.createTask(taskData);
      setTasks([response.data.data || response.data, ...tasks]);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      return false;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await api.updateTask(id, updates);
      setTasks(tasks.map(task => task._id === id ? (response.data.data || response.data) : task));
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      return false;
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return false;
    }
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
      return false;
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchTerm, filterStatus]);

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length
  }), [tasks]);

  return {
    tasks: filteredTasks,
    loading,
    error,
    setError,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    stats,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks
  };
};