import React from 'react';

export const StatusTracker: React.FC<{ status: string }> = ({ status }) => {
  const steps = ['Validated', 'Submitted', 'Under Review', 'Decision'];
  const currentIdx = steps.indexOf(status) || 1;

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx <= currentIdx ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {idx + 1}
              </div>
              <span className="text-[10px] mt-2 font-medium">{step}</span>
            </div>
            {idx < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${idx < currentIdx ? 'bg-blue-600' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
