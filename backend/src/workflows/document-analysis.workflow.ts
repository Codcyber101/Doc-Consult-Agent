import { Injectable, Logger } from '@nestjs/common';
import { TemporalService } from './temporal.service';

@Injectable()
export class DocumentWorkflowService {
  private readonly logger = new Logger(DocumentWorkflowService.name);

  constructor(private readonly temporalService: TemporalService) {}

  async startAnalysis(documentId: string): Promise<string> {
    this.logger.log(`Starting analysis for document ${documentId}`);
    return this.temporalService.startWorkflow('DocumentAnalysisWorkflow', { documentId });
  }
}
