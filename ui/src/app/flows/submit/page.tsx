"use client";
import React, { useState } from 'react';

export default function SubmissionPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Final Review & Submission</h1>
      <div className="bg-blue-50 p-4 rounded mb-8 text-sm">
        By clicking submit, you consent to GovAssist Ethiopia transmitting your 
        validated application and documents to the MESOB portal.
      </div>
      
      {!submitted ? (
        <button 
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? 'Transmitting to MESOB...' : 'Submit to MESOB'}
        </button>
      ) : (
        <div className="text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-xl font-bold">Successfully Submitted!</h2>
          <p className="text-gray-600 mt-2">Application ID: MESOB-8821-X</p>
        </div>
      )}
    </div>
  );
}
