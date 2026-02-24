import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuditEvent } from "../../models/audit-event.entity";

export interface AuditIngestPayload {
  timestamp: string;
  event_type: string;
  actor: string;
  details: any;
  signature: string;
  key_id: string;
  correlation_id?: string;
}

@Injectable()
export class AuditIngestService {
  constructor(
    @InjectRepository(AuditEvent)
    private readonly auditRepository: Repository<AuditEvent>,
  ) {}

  async ingest(event: AuditIngestPayload): Promise<AuditEvent> {
    const row = this.auditRepository.create({
      timestamp: event.timestamp,
      event_type: event.event_type,
      actor: event.actor,
      details: event.details,
      signature: event.signature,
      key_id: event.key_id,
      correlation_id: event.correlation_id ?? null,
    });
    return this.auditRepository.save(row);
  }

  async list(options: { limit: number; offset: number }) {
    const [items, total] = await this.auditRepository.findAndCount({
      order: { created_at: "DESC" as any },
      take: options.limit,
      skip: options.offset,
    });
    return { items, total };
  }
}

