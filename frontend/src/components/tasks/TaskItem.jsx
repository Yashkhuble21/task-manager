import React, { useState } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const title = document.getElementById(`edit-title-${task._id}`).value;
    const description = document.getElementById(`edit-desc-${task._id}`).value;
    const success = await onUpdate(task._id, { ...task, title, description });
    if (success) setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <input
            type="text"
            defaultValue={task.title}
            id={`edit-title-${task._id}`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            defaultValue={task.description}
            id={`edit-desc-${task._id}`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{task.title}</h3>
          {task.description && <p className="text-gray-600">{task.description}</p>}
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <select
          value={task.status}
          onChange={(e) => onUpdate(task._id, { ...task, status: e.target.value })}
          className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
            task.status === 'completed' ? 'bg-green-100 text-green-800' :
            task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          task.priority === 'high' ? 'bg-red-100 text-red-800' :
          task.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {task.priority.toUpperCase()}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}