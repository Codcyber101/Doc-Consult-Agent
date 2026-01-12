import React from 'react';

interface Step {
  order: number;
  title: string;
  office: string;
  requirements: string[];
  fee: number;
  duration: string;
}

interface PlaybookProps {
  playbook: {
    service_type: string;
    jurisdiction: string;
    steps: Step[];
  };
}

export const PlaybookViewer: React.FC<PlaybookProps> = ({ playbook }) => {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-2">{playbook.service_type.replace(/_/g, ' ')}</h2>
      <p className="text-gray-600 mb-6">Jurisdiction: {playbook.jurisdiction}</p>
      
      <div className="space-y-8">
        {playbook.steps.sort((a, b) => a.order - b.order).map((step) => (
          <div key={step.order} className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-xl font-semibold">Step {step.order}: {step.title}</h3>
            <p className="text-sm text-gray-500 mb-2">Office: {step.office} | Duration: {step.duration}</p>
            <div className="mb-2">
              <span className="font-medium text-sm">Requirements:</span>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {step.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
              </ul>
            </div>
            <p className="text-sm font-bold text-green-600">Fee: {step.fee} ETB</p>
          </div>
        ))}
      </div>
    </div>
  );
};
