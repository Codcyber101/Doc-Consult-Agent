import { Injectable, Logger } from "@nestjs/common";
import { mesobSubmissionTotal } from "../../metrics/metrics";

@Injectable()
export class MesobConnectorService {
  private readonly logger = new Logger(MesobConnectorService.name);

  async submitApplication(packageData: any): Promise<string> {
    const baseUrl = process.env.MESOB_BASE_URL;
    const apiKey = process.env.MESOB_API_KEY;
    const submitPath = process.env.MESOB_SUBMIT_PATH || "/applications";

    if (!baseUrl) {
      const submissionId = `mesob-${Math.random().toString(36).substring(7)}`;
      this.logger.log(
        `[MOCK MESOB] Submitting application package. Assigned ID: ${submissionId}`,
      );
      mesobSubmissionTotal.inc();
      return submissionId;
    }

    const fetchFn = (globalThis as any).fetch as any;
    if (typeof fetchFn !== "function") {
      throw new Error("fetch() is not available in this Node runtime.");
    }

    const res = await fetchFn(`${baseUrl}${submitPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify(packageData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `MESOB submit failed: ${res.status} ${res.statusText} - ${text}`,
      );
    }

    const json = await res.json();
    const submissionId: string | undefined =
      json?.id || json?.submission_id || json?.application_id;

    if (!submissionId) {
      throw new Error("MESOB response did not include a submission id.");
    }

    mesobSubmissionTotal.inc();
    return submissionId;
  }

  async getStatus(submissionId: string): Promise<string> {
    const baseUrl = process.env.MESOB_BASE_URL;
    const apiKey = process.env.MESOB_API_KEY;
    const statusPathTemplate =
      process.env.MESOB_STATUS_PATH_TEMPLATE || "/applications/{id}/status";

    if (!baseUrl) {
      return "UNDER_REVIEW";
    }

    const fetchFn = (globalThis as any).fetch as any;
    if (typeof fetchFn !== "function") {
      throw new Error("fetch() is not available in this Node runtime.");
    }

    const statusPath = statusPathTemplate.replace("{id}", submissionId);
    const res = await fetchFn(`${baseUrl}${statusPath}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `MESOB status failed: ${res.status} ${res.statusText} - ${text}`,
      );
    }

    const json = await res.json();
    return (
      json?.status ||
      json?.state ||
      json?.application_status ||
      "UNDER_REVIEW"
    );
  }
}
