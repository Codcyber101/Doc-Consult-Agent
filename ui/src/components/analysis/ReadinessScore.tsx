'use client';

import React from 'react';

interface ReadinessScoreProps {
  score: number;
}

export function ReadinessScore({ score }: ReadinessScoreProps) {
  // Determine color based on score
  const getColor = (s: number) => {
    if (s >= 90) return 'text-green-600';
    if (s >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getBgColor = (s: number) => {
    if (s >= 90) return 'bg-green-100';
    if (s >= 70) return 'bg-amber-100';
    return 'bg-red-100';
  };

  return (
    <div className={`flex items-center px-4 py-2 rounded-2xl ${getBgColor(score)}`}>
      <div className="relative flex items-center justify-center">
        <svg className="w-10 h-10 transform -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/30"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={100}
            strokeDashoffset={100 - score}
            className={`${getColor(score)} transition-all duration-1000 ease-out`}
          />
        </svg>
        <span className={`absolute text-xs font-bold ${getColor(score)}`}>
          {score}%
        </span>
      </div>
      <div className="ml-3">
        <p className={`text-xs font-bold uppercase tracking-wider ${getColor(score)}`}>
          Readiness Score
        </p>
      </div>
    </div>
  );
}