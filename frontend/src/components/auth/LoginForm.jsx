import React, { useState } from 'react';

export default function LoginForm({ onLogin, onSwitchToRegister, loading, error }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">MERN Task Manager</h1>
        <p className="text-gray-600">Vite + React + Node.js + MongoDB</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="w-full text-blue-600 hover:text-blue-800 text-sm"
        >
          Don't have an account? Register
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
        <p className="font-semibold mb-2">MERN Stack Features:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>JWT Authentication</li>
          <li>Protected Routes</li>
          <li>CRUD Operations</li>
        </ul>
      </div>
    </div>
  );
}