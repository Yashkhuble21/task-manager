import React from 'react';

export default function TaskStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-gray-600 text-sm">Total Tasks</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        <div className="text-gray-600 text-sm">Completed</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
        <div className="text-gray-600 text-sm">In Progress</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
        <div className="text-gray-600 text-sm">Pending</div>
      </div>
    </div>
  );
}