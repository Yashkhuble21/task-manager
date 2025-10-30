import React from 'react';
import { X } from 'lucide-react';

export default function ErrorAlert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
      <span>{message}</span>
      <button onClick={onClose} className="text-red-700 hover:text-red-900">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}