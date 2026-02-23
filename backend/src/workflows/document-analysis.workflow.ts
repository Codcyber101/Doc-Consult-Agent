import { Injectable, Logger } from "@nestjs/common";
import { TemporalService } from "./temporal.service";

@Injectable()
export class DocumentWorkflowService {
  private readonly logger = new Logger(DocumentWorkflowService.name);

  constructor(private readonly temporalService: TemporalService) {}

  async startAnalysis(options: {
    documentId: string;
    analysisId: string;
    jurisdictionKey?: string;
    processId?: string;
    documents?: string[];
  }): Promise<string> {
    this.logger.log(`Starting analysis for document ${options.documentId}`);
    return this.temporalService.startWorkflow("DocumentAnalysisWorkflow", {
      document_id: options.documentId,
      analysis_id: options.analysisId,
      jurisdiction_key: options.jurisdictionKey ?? "addis-ababa",
      process_id: options.processId ?? "trade-license",
      documents: options.documents ?? [],
    });
  }
}
