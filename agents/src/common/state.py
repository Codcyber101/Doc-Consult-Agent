from typing import Annotated, Sequence, TypedDict, List, Dict, Any, Optional
from pydantic import BaseModel, Field
import operator

class Artifact(BaseModel):
    id: str
    type: str  # e.g., "document", "report", "extraction"
    content: Any
    metadata: Dict[str, Any] = Field(default_factory=dict)
    signed_hash: Optional[str] = None

class AgentState(TypedDict):
    # The list of messages in the conversation
    messages: Annotated[Sequence[Dict[str, Any]], operator.add]
    # Current document being processed
    document_id: str
    # Path to original file in storage
    file_path: str
    # Extracted data (masked for safety)
    extracted_data: Dict[str, Any]
    # Compliance findings
    findings: List[Dict[str, Any]]
    # Privacy/Safety status
    pii_masked: bool
    # Confidence scores for various stages
    confidence: Dict[str, float]
    # Final compliance status: PASS, FAIL, MANUAL_REVIEW
    status: str
    # Audit trail IDs
    audit_ids: List[str]
    # Internal artifacts produced during execution
    artifacts: List[Artifact]
