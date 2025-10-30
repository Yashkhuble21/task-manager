import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useTasks } from './hooks/useTasks';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Header from './components/layout/Header';
import TaskStats from './components/tasks/TaskStats';
import TaskFilters from './components/tasks/TaskFilters';
import TaskForm from './components/tasks/TaskForm';
import TaskList from './components/tasks/TaskList';
import ErrorAlert from './components/common/ErrorAlert';

function App() {
  const { user, login, register, logout, loading: authLoading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [authError, setAuthError] = useState(null);

  const {
    tasks,
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
    deleteTask
  } = useTasks(user);

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      setAuthError(null);
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      await register(name, email, password);
      setAuthError(null);
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleCreateTask = async (taskData) => {
    const success = await createTask(taskData);
    if (success) setShowAddForm(false);
    return success;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        {showRegister ? (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => { setShowRegister(false); setAuthError(null); }}
            loading={authLoading}
            error={authError}
          />
        ) : (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => { setShowRegister(true); setAuthError(null); }}
            loading={authLoading}
            error={authError}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Header user={user} onLogout={logout} />
        <TaskStats stats={stats} />
        <TaskFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          onAddTask={() => setShowAddForm(!showAddForm)}
        />
        {showAddForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowAddForm(false)}
          />
        )}
        <ErrorAlert message={error} onClose={() => setError(null)} />
        <TaskList
          tasks={tasks}
          loading={loading}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;