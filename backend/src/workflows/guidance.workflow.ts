import { Injectable, Logger } from '@nestjs/common';
import { TemporalService } from './temporal.service';

@Injectable()
export class GuidanceWorkflowService {
  private readonly logger = new Logger(GuidanceWorkflowService.name);
  private readonly CONFIDENCE_THRESHOLD = 0.70;

  constructor(private readonly temporalService: TemporalService) {}

  async startGuidanceQuery(question: string): Promise<any> {
    this.logger.log(`Processing guidance query: ${question}`);
    
    // In a real implementation, this would start a Temporal workflow
    // that calls the RAG agent and checks the confidence score.
    const mockResult = {
      summary: 'Guidance text...',
      confidence_score: 0.65, // Example below threshold
    };

    if (mockResult.confidence_score < this.CONFIDENCE_THRESHOLD) {
      this.logger.warn(`Confidence ${mockResult.confidence_score} below threshold. Escalating to human.`);
      return {
        ...mockResult,
        escalated_to_human: true,
        message: 'Your query has been escalated to a human expert for verification.'
      };
    }

    return {
      ...mockResult,
      escalated_to_human: false
    };
  }
}
