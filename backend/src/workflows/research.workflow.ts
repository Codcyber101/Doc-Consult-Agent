import { Injectable, Logger } from "@nestjs/common";
import { TemporalService } from "./temporal.service";

@Injectable()
export class ResearchWorkflowService {
  private readonly logger = new Logger(ResearchWorkflowService.name);

  constructor(private readonly temporalService: TemporalService) {}

  async startPolicyResearch(
    query: string,
    jurisdiction: string = "Federal",
  ): Promise<string> {
    this.logger.log(`Starting policy research for query: ${query}`);
    return this.temporalService.startWorkflow("PolicyResearchWorkflow", {
      query,
      jurisdiction,
    });
  }

  async getResearchStatus(jobId: string): Promise<any> {
    // In real app, query Temporal or DB
    return { jobId, status: "RUNNING" };
  }
}
