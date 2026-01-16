import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  async logEvent(userId: string, action: string, details: any) {
    const event = {
      userId,
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    // In production, write to Kafka or signed Postgres table
    this.logger.log(`[AUDIT EVENT] ${JSON.stringify(event)}`);
    return true;
  }

  async emitSafetyAudit(maskedText: string, action: string) {
    this.logger.warn(`[SAFETY AUDIT] Action: ${action} | Masked Result: ${maskedText}`);
    // Emit to Kafka logic here
    return true;
  }
}
