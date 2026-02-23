"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { apiClient } from "@/lib/api/client";

export default function SubmissionPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [portalSubmissionId, setPortalSubmissionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      // MVP: send a minimal package payload. In production this should be built
      // from validated analysis artifacts + user-approved fields.
      const resp = await apiClient.post("/submissions", {
        package: {
          service_type: "TRADE_LICENSE_RENEWAL",
          jurisdiction: "Addis Ababa - Bole",
          submitted_from: "ui",
        },
      });
      setSubmissionId(resp.data?.submission_id || null);
      setPortalSubmissionId(resp.data?.portal_submission_id || null);
      setSubmitted(true);
    } catch (e: any) {
      setError(e?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Final Review & Submission</h1>
      <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl mb-8 text-sm">
        By clicking submit, you consent to GovAssist Ethiopia transmitting your 
        validated application and documents to the MESOB portal.
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl mb-6 text-sm text-red-800">
          {error}
        </div>
      )}
      
      {!submitted ? (
        <button 
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark disabled:bg-slate-400"
        >
          {submitting ? 'Transmitting to MESOB...' : 'Submit to MESOB'}
        </button>
      ) : (
        <div className="text-center">
          <div className="text-primary text-6xl mb-4">✓</div>
          <h2 className="text-xl font-bold">Successfully Submitted!</h2>
          <p className="text-gray-600 mt-2">
            Submission ID: <span className="font-mono">{submissionId}</span>
          </p>
          <p className="text-gray-600 mt-2">
            MESOB ID: <span className="font-mono">{portalSubmissionId}</span>
          </p>
          {submissionId && (
            <div className="mt-6">
              <Link
                href={`/track/${submissionId}`}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-slate-900 text-white font-bold"
              >
                Track submission
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
