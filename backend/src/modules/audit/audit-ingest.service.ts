import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuditEvent } from "../../models/audit-event.entity";
import * as crypto from "crypto";

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
  private readonly logger = new Logger(AuditIngestService.name);

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

  async findOne(id: string): Promise<AuditEvent | null> {
    return this.auditRepository.findOne({ where: { id } });
  }

  async list(options: { limit: number; offset: number }) {
    const [items, total] = await this.auditRepository.findAndCount({
      order: { created_at: "DESC" as any },
      take: options.limit,
      skip: options.offset,
    });
    return { items, total };
  }

  async verifySignature(event: AuditEvent): Promise<{
    valid: boolean;
    reason?: string;
    payload?: string;
    expected?: string;
  }> {
    const secret = process.env.SIGNING_SECRET;
    if (!secret) {
      return { valid: false, reason: "SIGNING_SECRET not configured on server" };
    }

    const payload = {
      timestamp: event.timestamp,
      event_type: event.event_type,
      actor: event.actor,
      details: event.details,
    };

    const dumped = this.stableStringify(payload);
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(dumped);
    const expected = `v1:${hmac.digest("hex")}`;

    if (event.signature === expected) {
      return { valid: true, payload: dumped };
    }

    return {
      valid: false,
      reason: "Signature mismatch",
      payload: dumped,
      expected: expected,
    };
  }

  private stableStringify(obj: any): string {
    if (obj === null || typeof obj !== "object") {
      return JSON.stringify(obj);
    }

    if (Array.isArray(obj)) {
      return "[" + obj.map((item) => this.stableStringify(item)).join(",") + "]";
    }

    const sortedKeys = Object.keys(obj).sort();
    const result =
      "{" +
      sortedKeys
        .map((key) => `"${key}":${this.stableStringify(obj[key])}`)
        .join(",") +
      "}";
    return result;
  }
}

