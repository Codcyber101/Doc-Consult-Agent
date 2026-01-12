import { Module, Global } from '@nestjs/common';
import { TemporalService } from './temporal.service';
import { DocumentWorkflowService } from './document-analysis.workflow';

@Global()
@Module({
  providers: [TemporalService, DocumentWorkflowService],
  exports: [TemporalService, DocumentWorkflowService],
})
export class TemporalModule {}
