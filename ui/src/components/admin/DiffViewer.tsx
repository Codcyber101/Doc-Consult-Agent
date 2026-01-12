import React from 'react';

export const DiffViewer: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-gray-50 border rounded-lg">
      <h4 className="font-bold mb-4">Version Comparison</h4>
      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-2 bg-red-50 text-red-700 line-through">
          - fee: 500
        </div>
        <div className="p-2 bg-green-50 text-green-700">
          + fee: 550
        </div>
      </div>
    </div>
  );
};
