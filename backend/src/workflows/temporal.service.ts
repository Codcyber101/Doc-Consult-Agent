import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TemporalService {
  private readonly logger = new Logger(TemporalService.name);

  async startWorkflow(workflowName: string, args: any): Promise<string> {
    const workflowId = `mock-wf-${Math.random().toString(36).substring(7)}`;
    this.logger.log(`[MOCK TEMPORAL] Starting workflow ${workflowName} with ID ${workflowId}`);
    return workflowId;
  }

  async getStatus(workflowId: string): Promise<string> {
    return 'COMPLETED'; // Mock status
  }
}
