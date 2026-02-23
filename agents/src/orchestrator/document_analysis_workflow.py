import os
import base64
import tempfile
from typing import Any, Dict, List, Optional

import httpx
from temporalio import workflow, activity

from agents.src.orchestrator.graph import orchestrator


@activity.defn
async def run_document_analysis(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Activity: fetch document bytes from backend, run orchestrator, return compliance report.
    """
    backend_url = os.getenv("BACKEND_API_URL", "http://localhost:3000")
    internal_token = os.getenv("INTERNAL_API_TOKEN", "")
    if not internal_token:
        raise RuntimeError("INTERNAL_API_TOKEN must be set for document analysis activity.")

    document_id: str = payload["document_id"]
    analysis_id: str = payload["analysis_id"]
    jurisdiction_key: str = payload.get("jurisdiction_key", "addis-ababa")
    process_id: str = payload.get("process_id", "trade-license")
    documents: List[str] = payload.get("documents", [])

    headers = {"x-internal-token": internal_token}

    async with httpx.AsyncClient(timeout=60) as client:
        download = await client.get(
            f"{backend_url}/internal/documents/{document_id}/download", headers=headers
        )
        download.raise_for_status()
        body = download.json()
        mime_type = body.get("mime_type")
        bytes_base64 = body.get("bytes_base64")
        if not bytes_base64:
            raise RuntimeError("Backend did not return bytes_base64 for document download.")
        file_bytes = base64.b64decode(bytes_base64)

    # Write to temp file for OCR stack that expects a file path
    suffix = ".bin"
    if isinstance(mime_type, str) and "pdf" in mime_type:
        suffix = ".pdf"
    elif isinstance(mime_type, str) and "png" in mime_type:
        suffix = ".png"
    elif isinstance(mime_type, str) and "jpeg" in mime_type:
        suffix = ".jpg"

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name

    # Seed orchestrator state with user-provided document types for deterministic engine
    state: Dict[str, Any] = {
        "document_id": document_id,
        "file_path": tmp_path,
        "extracted_data": {"documents": documents},
        "confidence": {},
        "status": "PROCESSING",
        "pii_masked": False,
        "findings": [],
        "messages": [],
        "audit_ids": [],
        "artifacts": [],
        "jurisdiction_key": jurisdiction_key,
        "process_id": process_id,
        "service": "Trade License",
        "action": "renewal",
    }

    final_state = await orchestrator.ainvoke(state)

    compliance_report = final_state.get("compliance_report") or {
        "status": final_state.get("status", "UNCERTAIN"),
        "readiness_score": 0,
        "issues": [],
    }

    # Update backend analysis record
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(
            f"{backend_url}/internal/analyses/{analysis_id}/complete",
            headers=headers,
            json={"results": compliance_report},
        )
        resp.raise_for_status()

    return {"analysis_id": analysis_id, "results": compliance_report}


@workflow.defn
class DocumentAnalysisWorkflow:
    @workflow.run
    async def run(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Workflow: run a single document analysis job.
        """
        try:
            return await workflow.execute_activity(
                run_document_analysis,
                payload,
                start_to_close_timeout=60 * 10,
            )
        except Exception as e:
            backend_url = os.getenv("BACKEND_API_URL", "http://localhost:3000")
            internal_token = os.getenv("INTERNAL_API_TOKEN", "")
            analysis_id = payload.get("analysis_id")
            if internal_token and analysis_id:
                async with httpx.AsyncClient(timeout=30) as client:
                    await client.post(
                        f"{backend_url}/internal/analyses/{analysis_id}/fail",
                        headers={"x-internal-token": internal_token},
                        json={"error": str(e)},
                    )
            raise

