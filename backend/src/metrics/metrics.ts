// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: prod-ready-2026-02-04
// Generated-at: 2026-02-04T00:00:00Z
import {
  Counter,
  Histogram,
  Registry,
  collectDefaultMetrics,
} from "prom-client";

export const metricsRegistry = new Registry();

collectDefaultMetrics({ register: metricsRegistry });

export const httpRequestDuration = new Histogram({
  name: "http_request_duration_ms",
  help: "HTTP request duration in milliseconds",
  registers: [metricsRegistry],
  labelNames: ["method", "route", "status"],
  buckets: [25, 50, 100, 250, 500, 1000, 2000, 5000],
});

export const agentExecutionDuration = new Histogram({
  name: "agent_execution_duration_ms",
  help: "Agent execution duration in milliseconds",
  registers: [metricsRegistry],
  labelNames: ["agent_name", "status"],
  buckets: [25, 50, 100, 250, 500, 1000, 2000, 5000],
});

export const agentExecutionTotal = new Counter({
  name: "agent_execution_total",
  help: "Total agent executions",
  registers: [metricsRegistry],
  labelNames: ["agent_name", "status"],
});

export const ocrJobTotal = new Counter({
  name: "ocr_job_total",
  help: "Total OCR jobs executed",
  registers: [metricsRegistry],
});

export const complianceEvaluationTotal = new Counter({
  name: "compliance_evaluation_total",
  help: "Total compliance evaluations executed",
  registers: [metricsRegistry],
});

export const mesobSubmissionTotal = new Counter({
  name: "mesob_submission_total",
  help: "Total MESOB submissions executed",
  registers: [metricsRegistry],
});

export function recordAgentExecution(
  agentName: string,
  status: "success" | "error",
  durationMs: number,
) {
  agentExecutionTotal.labels(agentName, status).inc();
  agentExecutionDuration.labels(agentName, status).observe(durationMs);
}
